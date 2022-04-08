(function() {
  let nextPage = 1;
  const content = document.querySelector('.content');
  
  function renderUsers(users) {
    console.log(users)
    users.results.map(user => {
      const element = document.createElement('div');
      // const name = 
      element.className ='user';
      element.innerHTML = user.name.title+"."+user.name.first+" "+user.name.last;
      content.append(element);
    });
  }

  async function getUsers(page) {
    let url = `https://randomuser.me/api/?page=${page}&results=50`
    const users = (await fetch(url)).json();
    return users;
  }

  async function loadMoreUsers() {
    const { scrollTop, clientHeight, scrollHeight } = content;
    if (scrollHeight - scrollTop === clientHeight) {
      const users = await getUsers(nextPage);
      console.log(users)
      renderUsers(users);
      nextPage += 1;
    }
  }

  loadMoreUsers();
  nextPage += 1;

  content.addEventListener('scroll', loadMoreUsers);
})();