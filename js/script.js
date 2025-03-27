function uploadImage(event){
    let files;
 
    if (event.dataTransfer) {
       files = event.dataTransfer.files;
    } else if (event.target && event.target.files) {
       files = event.target.files;
    }
 
    if (files && files.length > 0) {
       if (files.length > 1) {
          infoImage.innerHTML = `<img src="./assets/images/icon-info.svg" alt="Icone info"> Não é possível enviar mais de uma imagem.`
          infoImage.classList.add('error-text')
          infoImage.classList.remove('info-image')
          return;
       }
       
       const file = files[0];
 
       if(file.size > 500000){
          infoImage.innerHTML = `<img src="./assets/images/icon-info.svg" alt="Icone info"> Arquivo é muito extenso. Envie um arquivo de até 500KB.`
          infoImage.classList.add('error-text')
          infoImage.classList.remove('info-image')
          return
       }
 
       if ((file.type.startsWith("image/png") || file.type.startsWith("image/jpeg")) && file.size <= 500000) {
        const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          fileInput.files = dataTransfer.files;
 
          imageUrl = URL.createObjectURL(file);
          const avatar = document.querySelector('#label-upload')
          avatar.innerHTML = 
          `
             <img src="${imageUrl}" alt="Icone info" id="uploaded-image">
             <div id="uploaded-image-div">
                <button id="remove-image">Remover imagem</button>
                <label for="avatar" id="change-image">Trocar imagem</label>
             </div>
          `;
          uploadArea.classList.remove('hoverable')
          infoImage.innerHTML = `<img src="./assets/images/icon-info.svg" alt="Icone info"> Adicione sua foto (JPG ou PNG, tam. máximo: 500KB).`
          infoImage.classList.add('info-image')
          infoImage.classList.remove('error-text')
       }
       const changeImage = document.querySelector('#change-image');
       changeImage.addEventListener('click', () => {
          fileInput.click()
       })
       const removeImage = document.querySelector('#remove-image');
       removeImage.addEventListener('click', () => {
          fileInput.value = ""
          const avatar = document.querySelector('#label-upload')
          avatar.innerHTML = `<img src="./assets/images/icon-upload.svg" alt="" id="upload-image">
               Arraste e solte ou clique para adicionar uma imagem`
          uploadArea.classList.add('hoverable')
          setTimeout(() => {
             imageUrl = ""
          }, 100);
       })
      
    }
 }


 const uploadArea = document.querySelector('#upload-area')
 const fileInput = document.querySelector('#avatar')
 let imageUrl = "";
 const infoImage = document.querySelector('#info-image')
 
 
 uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault()
    uploadArea.classList.add('dragover')
 })
 
 uploadArea.addEventListener('dragleave', (e) => {
    e.preventDefault()
    uploadArea.classList.remove('dragover')
 })
 
 uploadArea.addEventListener("drop", e => {
    e.preventDefault();
    uploadArea.classList.remove("dragover");
    uploadImage(e)
 });
 
 fileInput.addEventListener('change', (e) => {
    uploadImage(e)
 })
 
 uploadArea.addEventListener('click', ()=> {
    if(imageUrl == ""){
       fileInput.click()
    }
 })
 
 const form = document.querySelector('form')
 const labelUpload = document.querySelector('#label-upload');
 labelUpload.addEventListener('click', (e) => {
    e.preventDefault()
 })
 


 const inputName = document.querySelector('#name')
 const errorName = document.createElement('p')
 errorName.classList.add('error-text')
 inputName.after(errorName)
 
 const inputEmail = document.querySelector('#email')
 const errorEmail = document.createElement('p')
 inputEmail.after(errorEmail)
 errorEmail.classList.add('error-text')
 
 const inputGithub = document.querySelector('#github-username')
 const errorGithub = document.createElement('p')
 errorGithub.classList.add('error-text')
 inputGithub.after(errorGithub)
 
 
 
 form.addEventListener('submit', (e) => {
    e.preventDefault()
    const fullName = document.querySelector('#name').value
    const email = document.querySelector('#email').value
    const githubUsername = document.querySelector('#github-username').value
 
    if(imageUrl == ""){
       infoImage.classList.add('error-text')
       infoImage.classList.remove('info-image')
    }
 
    if(fullName == ""){
       inputName.classList.add('error-input')
       errorName.innerHTML = `<img src="./assets/images/icon-info.svg" alt="">Insira um nome válido`
    } else {
       inputName.classList.remove('error-input')
       errorName.innerHTML = ""
    }
 
 
    if(email == ""){
       inputEmail.classList.add('error-input')
       errorEmail.innerHTML = `<img src="./assets/images/icon-info.svg" alt="Icone info">Insira um email válido`
    } else {
       inputEmail.classList.remove('error-input')
       errorEmail.innerHTML = ""
    }
 
    if(githubUsername == "" || !githubUsername.startsWith("@")){
       inputGithub.classList.add('error-input')
       errorGithub.innerHTML = `<img src="./assets/images/icon-info.svg" alt="Icone info">Adicione um nome de usuário do Github válido`
    } else {
       inputGithub.classList.remove('error-input')
       errorGithub.innerHTML = ""
    }
 
    if(fullName != "" && email != "" && githubUsername != "" && githubUsername.startsWith("@") && imageUrl != ""){
        const main = document.querySelector('main')
        const numeroTicket = Math.floor(Math.random()*1000000)
        main.innerHTML = 
        `
        <img src="./assets/images/logo-full.svg" alt="Logo Coding Conf" id="logo">
        <div id="div-ticket" class="container-desktop">
           <h1>Parabéns, <span class="user-info">${fullName}</span>! Seu ingresso está pronto!.</h1>
     
           <p id="ticket-email">O ingresso foi enviado <span class="user-info">${email}</span>, fururas atualizações serão enviadas por email.</p>
     
           <div id="ticket">
              <div>
              <div id="ticket-top">
                 <img src="./assets/images/logo-mark.svg" alt="Logo de Coding Conf">
                 <span>
                    <h2>Coding Conf</h2>
                    <p>Jan 31, 2025 / Salvador, BA</p>
                 </span>
              </div>
              
              <div id="ticket-bot">
                 <img src="${imageUrl}" alt="User photo" id="profile-picture">
                 <span>
                    <h3>${fullName}</h3>
                    <p><img src="./assets/images/icon-github.svg" alt="Icone github">${githubUsername}</p>
                 </span>
              </div>
              </div>
              <p id="tag">#${numeroTicket}</p>
           </div>
     
        </div>
        <div class="attribution">
           Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>. 
           Coded by <a href="https://github.com">Gustavo Diniz</a>.
        </div>
        `
     }
  })