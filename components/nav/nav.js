function renderNav(parentId) {
  const parent = document.getElementById(parentId);
  const nav = document.createElement('div');
  nav.id = 'nav-container';
  parent.appendChild(nav);

  nav.innerHTML = `
                  <div id='logo-thin'>INSATS</div>
                  <div id='logo-bold'>BLÅ</div>
                `;
}