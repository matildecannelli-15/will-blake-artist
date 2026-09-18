// Invio del form contatti a Formspree senza lasciare la pagina;
// senza JS (o senza fetch) resta il normale POST del form.
(function () {
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  if (!form || !status || !window.fetch) return;
  var btn = form.querySelector('button[type="submit"]');

  function show(msg, ok) {
    status.textContent = msg;
    status.className = 'form-status ' + (ok ? 'is-ok' : 'is-error');
    status.hidden = false;
  }

  var ERROR_MSG = 'Qualcosa non ha funzionato. Riprova tra poco, oppure scrivimi a will.blake@outlook.it.';

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    btn.disabled = true;
    status.hidden = true;
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(function (res) {
      if (res.ok) {
        form.reset();
        // reset() non lancia "change": riallineo la nota tutoring nella home
        var select = document.getElementById('c-type');
        if (select) select.dispatchEvent(new Event('change', { bubbles: true }));
        show('Messaggio inviato. Ti rispondo appena posso.', true);
      } else {
        show(ERROR_MSG, false);
      }
    }).catch(function () {
      show(ERROR_MSG, false);
    }).then(function () {
      btn.disabled = false;
    });
  });
})();
