import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// Se inicializa el cliente de Prisma para poder hablar con la base de datos
const prisma = new PrismaClient();

// La función principal que se ejecutará
async function main() {
  // 1. Un mensaje para saber que el script comenzó
  console.log('Iniciando el script de seed...');

  // 2. Encriptar la contraseña que usará el admin
  const hashedPassword = await bcrypt.hash('admin-password-123', 10); // Puedes cambiar 'admin-password-123' por la que quieras

  // 3. Crear el usuario administrador
  // Usamos 'upsert' que significa: si el usuario con ese email no existe, créalo. Si ya existe, no hagas nada.
  // Esto evita errores si ejecutas el script más de una vez.
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@ecommerce.com' }, // El email que usará el admin para loguearse
    update: {}, // No actualices nada si ya existe
    create: {
      email: 'admin@ecommerce.com',
      name: 'Administrador Principal',
      password: hashedPassword,
      role: Role.ADMIN, // Se asigna el rol de Administrador
    },
  });

  // 4. Un mensaje para confirmar que el usuario se creó
  console.log(`Usuario administrador creado o ya existente: ${adminUser.email}`);
  console.log('Seed script finalizado.');
}

// 5. Ejecutar la función 'main' y manejar cualquier posible error
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // 6. Cerrar la conexión con la base de datos al terminar
    await prisma.$disconnect();
  });