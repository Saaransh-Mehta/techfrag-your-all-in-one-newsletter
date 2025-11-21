#!/usr/bin/env ts-node
/**
 * Admin Password Reset Script
 * 
 * This script allows you to securely reset the admin password.
 * The password will be hashed using bcrypt before being stored in the database.
 * 
 * Usage:
 *   npx ts-node scripts/reset-admin-password.ts <username> <new-password>
 * 
 * Example:
 *   npx ts-node scripts/reset-admin-password.ts admin mynewsecurepassword123
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function resetPassword(username: string, newPassword: string) {
  try {
    console.log(`\n🔒 Resetting password for user: ${username}\n`);

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      console.error(`❌ Error: User '${username}' not found in database.`);
      console.log(`\nAvailable users:`);
      const allUsers = await prisma.user.findMany({
        select: { username: true, createdAt: true },
      });
      allUsers.forEach(u => {
        console.log(`  - ${u.username} (created: ${u.createdAt.toISOString()})`);
      });
      process.exit(1);
    }

    // Hash the new password
    console.log('🔐 Hashing new password with bcrypt...');
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the password in the database
    await prisma.user.update({
      where: { username },
      data: { password: hashedPassword },
    });

    console.log(`✅ Password successfully updated for user '${username}'!`);
    console.log(`\n✨ You can now log in with:`);
    console.log(`   Username: ${username}`);
    console.log(`   Password: ${newPassword}`);
    console.log(`\n⚠️  Make sure to keep your password secure and don't share it.\n`);

  } catch (error) {
    console.error('❌ Error updating password:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Parse command-line arguments
const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error('❌ Invalid usage!');
  console.log('\nUsage:');
  console.log('  npx ts-node scripts/reset-admin-password.ts <username> <new-password>');
  console.log('\nExample:');
  console.log('  npx ts-node scripts/reset-admin-password.ts admin mynewsecurepassword123\n');
  process.exit(1);
}

const [username, newPassword] = args;

// Validate password strength
if (newPassword.length < 8) {
  console.error('❌ Error: Password must be at least 8 characters long.');
  process.exit(1);
}

// Run the reset
resetPassword(username, newPassword);
