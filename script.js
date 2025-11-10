const input = document.getElementById('userInput');
const btn = document.getElementById('checkBtn');
const avatar = document.getElementById('avatar');
const username = document.getElementById('username');
const result = document.getElementById('result');
const robuxCount = document.getElementById('robuxCount');
const confetti = document.getElementById('confetti');

btn.addEventListener('click', async () => {
  const user = input.value.replace('@', '').trim();
  if (!user) return alert('Escribe un nombre de usuario');

  // Obtener imagen real del perfil
  try {
    const res = await fetch(`https://api.roblox.com/users/get-by-username?username=${user}`);
    const data = await res.json();
    if (data.Id) {
      avatar.src = `https://www.roblox.com/headshot-thumbnail/image?userId=${data.Id}&width=150&height=150&format=png`;
      username.textContent = '@' + user;
    }
  } catch (e) {
    console.log('Error al obtener el perfil', e);
  }

  // Generar número aleatorio de robux
  const robux = Math.floor(Math.random() * (20000 - 100 + 1)) + 100;

  // Mostrar resultado con animación
  robuxCount.textContent = robux.toLocaleString();
  result.classList.remove('hidden');
  setTimeout(() => {
    result.style.opacity = 1;
  }, 100);

  // Mostrar confeti
  confetti.classList.remove('hidden');
  setTimeout(() => {
    confetti.classList.add('hidden');
  }, 3000);
});
