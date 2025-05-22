import bcrypt from 'bcrypt';

const hashPassword = async () => {
  const password = 'tu_contraseña_de_prueba';
  const hash = await bcrypt.hash(password, 10);
  console.log('Hash:', hash);
};

hashPassword();
