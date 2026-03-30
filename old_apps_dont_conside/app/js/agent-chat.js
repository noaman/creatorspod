(function () {
  var STORAGE_KEY = 'creatorspod-agent-chat-v1';

  var MODEL_OPTIONS = [
    { id: 'mini', label: 'Mini' },
    { id: 'max', label: 'Max' },
    { id: 'premium', label: 'Premium' }
  ];

  // UI-only demo agent list. You can expand this to include every card in the Copilot panel.
  var AGENT_OPTIONS = [
    { id: 'general', name: 'General Copilot', icon: 'fa-solid fa-wand-magic-sparkles' },
    { id: 'script', name: 'Script Writer', icon: 'fa-solid fa-pen' },
    { id: 'seo', name: 'SEO Optimizer', icon: 'fa-solid fa-magnifying-glass' },
    { id: 'headlines', name: 'Headlines', icon: 'fa-solid fa-heading' },
    { id: 'research', name: 'Deep Research', icon: 'fa-solid fa-diagram-project' },
    { id: 'repurpose', name: 'Cross-Platform Repurposing', icon: 'fa-solid fa-layer-group' },
    { id: 'localize', name: 'Translation & Localization', icon: 'fa-solid fa-language' },
    { id: 'summarize', name: 'Summarize', icon: 'fa-solid fa-compress' }
  ];

  function uid() {
    return Math.random().toString(16).slice(2) + '-' + Date.now().toString(16);
  }

  function convoKey(agentId, modelId) {
    return agentId + '::' + modelId;
  }

  function loadStore() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveStore(store) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (e) {}
  }

  function safeText(str) {
    return (str == null ? '' : String(str));
  }

  // DOM refs
  var el = {
    newBtn: document.getElementById('chat-new-btn'),
    historyList: document.getElementById('chat-history-list'),
    historyAgent: document.getElementById('chat-sidebar-agent'),
    historyModel: document.getElementById('chat-sidebar-model'),

    modelSelect: document.getElementById('chat-model-select'),
    agentSelect: document.getElementById('chat-agent-select'),

    messages: document.getElementById('chat-messages'),
    composer: document.getElementById('chat-composer'),
    form: document.getElementById('chat-composer'),
    text: document.getElementById('chat-text'),
    sendBtn: document.getElementById('chat-send-btn'),

    voiceBtn: document.getElementById('chat-voice-btn'),
    voiceIcon: document.getElementById('chat-voice-icon'),

    fileInput: document.getElementById('chat-file-input'),
    attachmentsWrap: document.getElementById('chat-attachments')
  };

  var store = loadStore();

  var params = new URLSearchParams(window.location.search);
  var initialAgentId = params.get('agent') || 'general';
  var initialModelId = params.get('model') || 'mini';

  var state = {
    agentId: initialAgentId,
    modelId: initialModelId,
    activeConvoId: null,
    attachments: [],
    recognition: null,
    listening: false
  };

  function getAgentById(agentId) {
    return AGENT_OPTIONS.find(function (a) { return a.id === agentId; }) || AGENT_OPTIONS[0];
  }

  function titleFromSlug(slug) {
    var clean = safeText(slug).trim();
    if (!clean) return 'Agent';
    clean = clean.replace(/[-_]+/g, ' ');
    return clean
      .split(' ')
      .filter(function (p) { return p; })
      .map(function (p) {
        return p.charAt(0).toUpperCase() + p.slice(1);
      })
      .join(' ');
  }

  function ensureAgentOption(agentId) {
    if (!agentId) return;
    var exists = AGENT_OPTIONS.some(function (a) { return a.id === agentId; });
    if (exists) return;
    AGENT_OPTIONS.push({
      id: agentId,
      name: titleFromSlug(agentId),
      icon: 'fa-solid fa-wand-magic-sparkles'
    });
  }

  function getModelById(modelId) {
    return MODEL_OPTIONS.find(function (m) { return m.id === modelId; }) || MODEL_OPTIONS[0];
  }

  function getConversations() {
    var key = convoKey(state.agentId, state.modelId);
    return store[key] && Array.isArray(store[key]) ? store[key] : [];
  }

  function setConversations(convos) {
    var key = convoKey(state.agentId, state.modelId);
    store[key] = convos;
    saveStore(store);
  }

  function createConversation(title) {
    var now = Date.now();
    return {
      id: uid(),
      title: title || 'New chat',
      messages: [],
      createdAt: now,
      updatedAt: now
    };
  }

  function ensureActiveConversation() {
    var convos = getConversations();
    if (convos.length === 0) {
      var c = createConversation('New chat');
      convos.push(c);
      setConversations(convos);
      state.activeConvoId = c.id;
      return c;
    }
    if (!state.activeConvoId) {
      state.activeConvoId = convos[0].id;
    }
    var active = convos.find(function (c) { return c.id === state.activeConvoId; }) || convos[0];
    state.activeConvoId = active.id;
    return active;
  }

  function setSidebarMeta() {
    var agent = getAgentById(state.agentId);
    var model = getModelById(state.modelId);
    el.historyAgent.textContent = agent.name;
    el.historyModel.textContent = model.label;
  }

  function renderHistory() {
    var convos = getConversations();
    var activeId = state.activeConvoId;

    el.historyList.innerHTML = '';

    if (convos.length === 0) return;

    convos
      .slice()
      .sort(function (a, b) { return b.updatedAt - a.updatedAt; })
      .forEach(function (c) {
        var li = document.createElement('li');
        li.className = 'chat-history-item' + (c.id === activeId ? ' active' : '');

        var title = document.createElement('span');
        title.className = 'chat-history-title';
        title.textContent = c.title || 'New chat';

        var sub = document.createElement('span');
        sub.className = 'chat-history-subtitle';
        var lastUser = (c.messages || []).slice().reverse().find(function (m) { return m.role === 'user'; });
        sub.textContent = lastUser ? safeText(lastUser.content).slice(0, 44) : 'Start by asking a question';

        li.appendChild(title);
        li.appendChild(sub);

        li.addEventListener('click', function () {
          state.activeConvoId = c.id;
          renderHistory();
          renderMessages();
        });

        el.historyList.appendChild(li);
      });
  }

  function getActiveConversation() {
    var convos = getConversations();
    return convos.find(function (c) { return c.id === state.activeConvoId; }) || convos[0] || null;
  }

  function updateActiveConversation(mutator) {
    var convos = getConversations();
    var idx = convos.findIndex(function (c) { return c.id === state.activeConvoId; });
    if (idx < 0) return;
    mutator(convos[idx]);
    convos[idx].updatedAt = Date.now();
    setConversations(convos);
  }

  function renderMessages() {
    var convo = getActiveConversation();
    if (!convo) return;

    el.messages.innerHTML = '';

    (convo.messages || []).forEach(function (m) {
      var row = document.createElement('div');
      row.className = 'chat-bubble-row ' + m.role;

      var bubble = document.createElement('div');
      bubble.className = 'chat-bubble ' + m.role;

      var meta = document.createElement('div');
      meta.className = 'chat-bubble-meta';

      var metaLeft = document.createElement('span');
      metaLeft.className = 'chat-bubble-meta-left';

      var icon = document.createElement('i');
      if (m.role === 'user') {
        icon.className = 'fa-solid fa-user';
        metaLeft.appendChild(icon);
        metaLeft.appendChild(document.createTextNode('You'));
      } else {
        icon.className = 'fa-solid fa-robot';
        metaLeft.appendChild(icon);
        metaLeft.appendChild(document.createTextNode('Copilot'));
      }

      var metaTime = document.createElement('span');
      metaTime.className = 'chat-bubble-meta-time';
      if (m.timestamp) {
        try {
          metaTime.textContent = new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } catch (e) {
          metaTime.textContent = '';
        }
      }

      meta.appendChild(metaLeft);
      meta.appendChild(metaTime);

      var content = document.createElement('div');
      content.className = 'chat-bubble-content';
      content.textContent = m.content || '';

      bubble.appendChild(meta);
      bubble.appendChild(content);

      if (m.attachments && m.attachments.length) {
        var inline = document.createElement('div');
        inline.className = 'chat-attachments-inline';
        m.attachments.forEach(function (a) {
          var pill = document.createElement('span');
          pill.className = 'chat-attachment-pill';
          pill.textContent = a.name;
          inline.appendChild(pill);
        });
        bubble.appendChild(inline);
      }

      row.appendChild(bubble);
      el.messages.appendChild(row);
    });

    // Scroll to bottom after render
    el.messages.scrollTop = el.messages.scrollHeight;
  }

  function renderAttachments() {
    el.attachmentsWrap.innerHTML = '';

    (state.attachments || []).forEach(function (att, i) {
      var chip = document.createElement('div');
      chip.className = 'chat-attachment-chip';

      var name = document.createElement('span');
      name.textContent = att.name;

      var remove = document.createElement('button');
      remove.type = 'button';
      remove.setAttribute('aria-label', 'Remove attachment');
      remove.textContent = '×';
      remove.addEventListener('click', function () {
        state.attachments.splice(i, 1);
        renderAttachments();
      });

      chip.appendChild(name);
      chip.appendChild(remove);
      el.attachmentsWrap.appendChild(chip);
    });
  }

  function ensureAgentSelectOptions() {
    el.agentSelect.innerHTML = '';
    AGENT_OPTIONS.forEach(function (a) {
      var opt = document.createElement('option');
      opt.value = a.id;
      opt.textContent = a.name;
      el.agentSelect.appendChild(opt);
    });
    el.agentSelect.value = state.agentId;
  }

  function ensureModelSelectOptions() {
    MODEL_OPTIONS.forEach(function (m) {
      // Options are in HTML, this only verifies value set
      if (el.modelSelect.value !== state.modelId) return;
    });
    el.modelSelect.value = state.modelId;
  }

  function setListeningUI(listening) {
    state.listening = listening;
    if (listening) {
      el.voiceBtn.classList.add('listening');
      el.voiceIcon.classList.remove('fa-microphone');
      el.voiceIcon.classList.add('fa-microphone-lines');
    } else {
      el.voiceBtn.classList.remove('listening');
      el.voiceIcon.classList.remove('fa-microphone-lines');
      el.voiceIcon.classList.add('fa-microphone');
    }
  }

  function initVoice() {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      el.voiceBtn.disabled = true;
      el.voiceBtn.title = 'Voice is not supported in this browser';
      return;
    }

    var recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = function (event) {
      var transcript = '';
      for (var i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      if (transcript.trim()) {
        el.text.value = transcript.trim();
      }
    };

    recognition.onerror = function () {
      setListeningUI(false);
    };

    recognition.onend = function () {
      setListeningUI(false);
    };

    state.recognition = recognition;

    el.voiceBtn.addEventListener('click', function () {
      if (!state.recognition) return;
      if (state.listening) {
        try { state.recognition.stop(); } catch (e) {}
        setListeningUI(false);
        return;
      }
      try {
        setListeningUI(true);
        state.recognition.start();
      } catch (e) {
        setListeningUI(false);
      }
    });
  }

  function buildAssistantPlaceholder(userText, attachmentCount) {
    var agent = getAgentById(state.agentId).name;
    var model = getModelById(state.modelId).label;
    var trimmed = safeText(userText).trim();
    var preview = trimmed.length > 110 ? trimmed.slice(0, 110) + '...' : trimmed;

    var attachmentPart = attachmentCount
      ? (' I also see ' + attachmentCount + ' attached file(s).')
      : '';

    return (
      'Demo response (' + model + ' • ' + agent + ').\n\n' +
      'You asked: "' + preview + '"' + attachmentPart + '\n\n' +
      'Next step: connect this UI to a real backend/LLM to generate actual outputs.'
    );
  }

  function setConversationTitleIfNeeded(convo, userText) {
    if (convo.title && convo.title !== 'New chat') return;
    var t = safeText(userText).trim();
    if (!t) return;
    convo.title = t.length > 34 ? (t.slice(0, 34) + '...') : t;
  }

  function updateChatMetaUI() {
    setSidebarMeta();
    renderHistory();
  }

  function newChat() {
    var convos = getConversations();
    var c = createConversation('New chat');
    convos.push(c);
    setConversations(convos);
    state.activeConvoId = c.id;
    state.attachments = [];
    renderAttachments();
    renderHistory();
    renderMessages();
  }

  function switchContext() {
    setSidebarMeta();
    var active = ensureActiveConversation();
    state.activeConvoId = active ? active.id : null;
    state.attachments = [];
    renderAttachments();
    renderHistory();
    renderMessages();
  }

  function setActiveFromFirstConversation() {
    var convos = getConversations();
    if (!convos.length) return;
    state.activeConvoId = convos.slice().sort(function (a, b) { return b.updatedAt - a.updatedAt; })[0].id;
  }

  function sendMessage() {
    var userText = safeText(el.text.value).trim();
    var hasAttachments = state.attachments && state.attachments.length > 0;
    if (!userText && !hasAttachments) return;

    var convo = getActiveConversation();
    if (!convo) {
      convo = ensureActiveConversation();
    }
    if (!convo) return;

    var now = Date.now();
    var attachmentCount = state.attachments ? state.attachments.length : 0;
    var attachmentsMeta = (state.attachments || []).map(function (a) {
      return { name: a.name, type: a.type || '', size: a.size || 0 };
    });

    var userMsg = {
      id: uid(),
      role: 'user',
      content: userText,
      attachments: attachmentsMeta,
      timestamp: now
    };

    updateActiveConversation(function (c) {
      setConversationTitleIfNeeded(c, userText);
      c.messages = c.messages || [];
      c.messages.push(userMsg);
    });

    el.text.value = '';
    state.attachments = [];
    renderAttachments();
    renderMessages();

    // Add assistant response after a delay (demo typing simulation)
    var placeholder = {
      id: uid(),
      role: 'assistant',
      content: '',
      attachments: [],
      timestamp: Date.now()
    };

    updateActiveConversation(function (c) {
      c.messages = c.messages || [];
      c.messages.push(placeholder);
    });
    renderMessages();

    var assistantText = buildAssistantPlaceholder(userText, attachmentCount);
    setTimeout(function () {
      updateActiveConversation(function (c) {
        var msgs = c.messages || [];
        var idx = msgs.findIndex(function (m) { return m.id === placeholder.id; });
        if (idx >= 0) {
          msgs[idx].content = assistantText;
        }
      });
      renderMessages();
    }, 700);
  }

  function initSendEvents() {
    el.form.addEventListener('submit', function (e) {
      e.preventDefault();
      sendMessage();
    });

    el.text.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.ctrlKey) {
        // Keep Enter for newline; Ctrl+Enter to send
        return;
      }
      if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  function initFileEvents() {
    el.fileInput.addEventListener('change', function () {
      var files = Array.prototype.slice.call(el.fileInput.files || []);
      state.attachments = files.map(function (f) {
        return { name: f.name, type: f.type || '', size: f.size || 0 };
      });
      renderAttachments();
      // Reset input so same file can be re-selected
      el.fileInput.value = '';
    });
  }

  function initSelectEvents() {
    el.modelSelect.addEventListener('change', function () {
      state.modelId = el.modelSelect.value;
      state.activeConvoId = null;
      switchContext();
    });

    el.agentSelect.addEventListener('change', function () {
      state.agentId = el.agentSelect.value;
      state.activeConvoId = null;
      switchContext();
    });
  }

  function initNewChatBtn() {
    el.newBtn.addEventListener('click', function () {
      newChat();
    });
  }

  function init() {
    ensureModelSelectOptions();

    // If navigated from an agent/workflow card, create an option on the fly.
    ensureAgentOption(state.agentId);

    ensureAgentSelectOptions();

    setSidebarMeta();

    // Normalize initial agent id in case of bad URL param
    if (!AGENT_OPTIONS.some(function (a) { return a.id === state.agentId; })) state.agentId = 'general';
    if (!MODEL_OPTIONS.some(function (m) { return m.id === state.modelId; })) state.modelId = 'mini';
    el.agentSelect.value = state.agentId;
    el.modelSelect.value = state.modelId;

    setSidebarMeta();

    // Create/get active convo
    setActiveFromFirstConversation();
    ensureActiveConversation();

    renderAttachments();
    renderHistory();
    renderMessages();

    initVoice();
    initSendEvents();
    initFileEvents();
    initSelectEvents();
    initNewChatBtn();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

