import { PrismaClient } from '../generated/prisma';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Crear un tenant
  const tenant = await prisma.tenant.upsert({
    where: { name: 'Empresa Demo' },
    update: {},
    create: { name: 'Empresa Demo' },
  });

  // Encriptar la contraseña
  const password = await bcrypt.hash('123456', 10);

  // Crear usuarios asignados a ese tenant
  await prisma.user.upsert({
    where: { email: 'admin@demo.com' },
    update: {},
    create: {
      email: 'admin@demo.com',
      name: 'Administrador',
      password,
      tenantId: tenant.id,
    },
  });

  await prisma.user.upsert({
    where: { email: 'usuario@demo.com' },
    update: {},
    create: {
      email: 'usuario@demo.com',
      name: 'Usuario Demo',
      password,
      tenantId: tenant.id,
    },
  });

  console.log('✅ Seed ejecutado correctamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });