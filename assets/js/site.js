/* A Profundidade da Palavra — scripts compartilhados */
(function () {
  'use strict';

  // Menu mobile
  var botao = document.querySelector('.btn-menu');
  var menu = document.getElementById('menu-principal');
  if (botao && menu) {
    botao.addEventListener('click', function () {
      var aberto = menu.classList.toggle('aberto');
      botao.setAttribute('aria-expanded', aberto ? 'true' : 'false');
      botao.textContent = aberto ? '✕ Fechar' : '☰ Menu';
    });
  }

  // Aviso (toast)
  function aviso(texto) {
    var t = document.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      t.setAttribute('role', 'status');
      document.body.appendChild(t);
    }
    t.textContent = texto;
    t.classList.add('visivel');
    setTimeout(function () { t.classList.remove('visivel'); }, 2200);
  }

  function copiar(texto) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(function () {
        aviso('Link copiado!');
      });
    } else {
      window.prompt('Copie o link:', texto);
    }
  }

  // Compartilhar
  document.querySelectorAll('[data-compartilhar]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var url = window.location.href;
      var titulo = document.title;
      var tipo = el.getAttribute('data-compartilhar');

      if (tipo === 'whatsapp') {
        window.open('https://wa.me/?text=' + encodeURIComponent(titulo + ' ' + url), '_blank', 'noopener');
      } else if (tipo === 'facebook') {
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), '_blank', 'noopener');
      } else if (tipo === 'copiar') {
        copiar(url);
      } else if (navigator.share) {
        navigator.share({ title: titulo, url: url }).catch(function () {});
      } else {
        copiar(url);
      }
    });
  });


  // Copiar texto específico (e-mail, endereço, telefone)
  document.querySelectorAll('[data-copiar-texto]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var valor = el.getAttribute('data-copiar-texto');
      var msg = el.getAttribute('data-copiar-aviso') || 'Copiado!';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(valor).then(function () {
          aviso(msg);
        });
      } else {
        window.prompt('Copie:', valor);
      }
    });
  });

  // Imprimir
  document.querySelectorAll('[data-imprimir]').forEach(function (el) {
    el.addEventListener('click', function (e) { e.preventDefault(); window.print(); });
  });

  // Ano no rodapé
  document.querySelectorAll('[data-ano]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
