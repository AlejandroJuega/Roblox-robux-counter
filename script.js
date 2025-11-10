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

  // Obtener datos reales del perfil
  try {
    const res = await fetch(`https://users.roblox.com/v1/users/search?keyword=${user}`);
    const data = await res.json();
    if (data.data && data.data.length > 0) {
      const userData = data.data[0];
      avatar.src = `https://www.roblox.com/headshot-thumbnail/image?userId=${userData.id}&width=150&height=150&format=png`;
      username.textContent = '@' + userData.name;
    } else {
      avatar.src = "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-Fallback.png";
      username.textContent = '@' + user;
    }
  } catch (e) {
    console.error('Error al obtener el perfil:', e);
    avatar.src = "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-Fallback.png";
    username.textContent = '@' + user;
  }

  // Generar número aleatorio de robux (simulado)
  const robux = Math.floor(Math.random() * (20000 - 100 + 1)) + 100;

  // Mostrar resultado con animación fade-in
  robuxCount.textContent = robux.toLocaleString();
  result.classList.remove('hidden');
  setTimeout(() => {
    result.style.opacity = 1;
  }, 100);

  // Mostrar confeti durante 3 segundos
  confetti.classList.remove('hidden');
  setTimeout(() => {
    confetti.classList.add('hidden');
  }, 3000);
});
