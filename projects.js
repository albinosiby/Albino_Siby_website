(() => {
  'use strict';
  const projects = window.portfolioProjects;
  const grid = document.querySelector('#projects-grid');
  const dialog = document.querySelector('#project-dialog');
  const content = document.querySelector('#project-detail');
  const count = document.querySelector('#projects-count');
  const filters = [...document.querySelectorAll('[data-project-filter]')];
  let lastTrigger;

  // Content is local, but keep rendering safe when the project catalog is edited.
  function escape(value) {
    return String(value).replace(/[&<>"']/g, char => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[char]));
  }
  function links(project) {
    return project.links.map(link => `<a class="project-link" href="${escape(link.url)}" target="_blank" rel="noopener noreferrer">${escape(link.label)} <span aria-hidden="true"><svg class="project-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg></span><span class="projects-sr-only"> (opens in a new tab)</span></a>`).join('');
  }
  function tags(project) {
    return project.technologies.map(tag => `<li>${escape(tag)}</li>`).join('');
  }
  function render(filter = 'All projects') {
    const visible = projects.filter(project => filter === 'All projects' || (filter === 'Featured' ? project.featured : project.category === filter));
    grid.innerHTML = visible.map(project => `
      <article class="project-card ${project.featured ? 'project-featured' : 'project-compact'} project-${project.accent}" data-project-id="${project.id}">
        ${project.featured ? `<div class="project-stage">
          <div class="project-stage-meta"><span class="project-visual-label">${escape(project.eyebrow)}</span><span class="project-featured-label"><span aria-hidden="true">✦</span> Featured</span></div>
          <button class="project-visual" data-project="${project.id}" aria-label="Explore ${escape(project.name)}">
            <span class="project-screen">
              <span class="project-screen-bar"><span class="project-screen-dots" aria-hidden="true"><i></i><i></i><i></i></span><span>${escape(project.name)}</span><span class="project-screen-line" aria-hidden="true"></span></span>
              <img src="${project.image}" alt="${escape(project.imageAlt)}" loading="lazy" width="1440" height="1000">
            </span>
            <span class="project-open" aria-hidden="true"><svg class="project-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 18 18 6M6 6h12v12"/></svg></span>
          </button>
        </div>` : (project.image ? `<button class="project-thumbnail" data-project="${project.id}" aria-label="Preview ${escape(project.name)}"><img src="${project.image}" alt="${escape(project.imageAlt)}" loading="lazy" width="1440" height="1000"><span aria-hidden="true"><svg class="project-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 18 18 6M6 6h12v12"/></svg></span></button>` : `<div class="project-mini-mark" aria-hidden="true">${escape(project.monogram)}</div>`)}
        <div class="project-copy">
          <div class="project-meta"><span>${escape(project.category)}</span><span class="project-index" aria-hidden="true">${String(projects.indexOf(project) + 1).padStart(2, '0')} /</span></div>
          <div class="project-title-row"><h3><button data-project="${project.id}">${escape(project.name)}</button></h3></div>
          <p>${escape(project.description)}</p>
          ${project.technologies.length ? `<ul class="project-tags" aria-label="Technologies">${tags(project)}</ul>` : (project.pending ? '<span class="project-content-note">Details to follow</span>' : '')}
          <div class="project-actions"><button class="project-detail-button" data-project="${project.id}">Explore project <span aria-hidden="true">→</span></button>${links(project)}</div>
        </div>
      </article>`).join('');
    count.textContent = `${visible.length.toString().padStart(2, '0')} projects`;
  }
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    render(button.dataset.projectFilter);
  }));
  grid.addEventListener('click', event => {
    const trigger = event.target.closest('[data-project]');
    if (!trigger) return;
    const project = projects.find(item => item.id === trigger.dataset.project);
    if (!project) return;
    lastTrigger = trigger;
    content.innerHTML = `
      <p class="projects-eyebrow">${escape(project.eyebrow)}</p>
      <h2 id="project-dialog-title">${escape(project.name)}</h2>
      <p class="project-detail-description">${escape(project.detail)}</p>
      ${project.image ? `<figure><img src="${project.image}" alt="${escape(project.imageAlt)}" width="1440" height="1000"><figcaption>${escape(project.imageCaption)}</figcaption></figure>` : '<div class="project-no-image">Screenshot not yet available</div>'}
      ${project.highlights.length ? `<h3>Inside the project</h3><ul class="project-highlights">${project.highlights.map(item => `<li>${escape(item)}</li>`).join('')}</ul>` : ''}
      ${project.technologies.length ? `<h3>Built with</h3><ul class="project-tags">${tags(project)}</ul>` : ''}
      <div class="project-detail-links">${links(project) || '<p class="project-content-note">Public link not yet available.</p>'}</div>`;
    dialog.showModal();
    document.querySelector('#project-dialog-close').focus();
    document.body.classList.add('project-dialog-open');
  });
  document.querySelector('#project-dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const focusable = [...dialog.querySelectorAll('button, a[href]')];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('project-dialog-open');
    lastTrigger?.focus({preventScroll: true});
  });
  render();
})();
