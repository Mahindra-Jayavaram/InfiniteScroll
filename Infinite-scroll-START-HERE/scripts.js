(function() {
  let nextPage = 1;
  const content = document.querySelector('.content');
  
  let i = 1 
  function renderUsers(users) {
    console.log(users)
    users.results.map(user => {
      const element = document.createElement('div');
      element.className ='user';
      // element.innerText = user.name.title+"."+user.name.first+" "+user.name.last;
      element.innerText = "Masai Student" + " "+ i;
      i= i+1;
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
      // console.log(scrollHeight-scrollTop)
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