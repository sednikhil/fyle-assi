function fetchGitHubProfile() {
    const username = document.getElementById('username').value;
  
    fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then(data => {
        document.getElementById('avatar').src = data.avatar_url;
        document.getElementById('name').innerText = data.name || data.login;
        document.getElementById('bio').innerText = data.bio || 'No bio available';
        document.getElementById('location').innerText = `Location: ${data.location || 'Not specified'}`;
        document.getElementById('repos').innerText = `Public Repositories: ${data.public_repos}`;
  
        document.getElementById('profile').style.display = 'block';
        fetchGitHubRepos(username);
      })
      .catch(error => {
        alert('Error fetching GitHub profile. Please check the username and try again.');
        console.error(error);
      });
  }
  
  function fetchGitHubRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(data => {
        const repoList = document.getElementById('repo-list');
        repoList.innerHTML = '';
  
        data.forEach(repo => {
          const repoCard = document.createElement('div');
          repoCard.classList.add('repo-card');
          repoCard.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || 'No description available'}</p>
            <p>Language: ${repo.language || 'Not specified'}</p>
            <p>Stars: ${repo.stargazers_count}</p>
          `;
          repoList.appendChild(repoCard);
        });
  
        document.getElementById('repo-cards').style.display = 'block';
      })
      .catch(error => {
        alert('Error fetching GitHub repositories. Please try again.');
        console.error(error);
      });
  }
  