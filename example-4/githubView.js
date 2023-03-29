class GithubView {
  constructor(model, client) {
    this.model = model;
    this.client = client;

    const submitButtonEl = document.querySelector('#submit-button');
    const repoInputEl = document.querySelector('#repo-name-input');

    submitButtonEl.addEventListener('click', () => {
      const repoName = repoInputEl.value;

      this.client.getRepoInfo(repoName, repoData => {
        console.log(repoData);
        this.display(repoData);
      });
    });
  }

  display(data) {
    
    const repoName = document.querySelector('#repo-name');
    const repoDes = document.querySelector('#repo-description');
    const repoImg = document.querySelector('#repo-image');

    repoName.textContent = data.name;
    repoDes.textContent = data.description;
    repoImg.src = data.organization.avatar_url;
  }
}

module.exports = GithubView;