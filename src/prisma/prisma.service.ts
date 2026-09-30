import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import 'dotenv/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const adapter = new PrismaLibSql({
      url: process.env.DATABASE_URL ?? 'file:./library.db',
    });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();

    const adminEmail = 'admin@example.com';

    const admin = await this.member.findUnique({
      where: { email: adminEmail },
    });

    if (!admin) {
      await this.member.create({
        data: {
          name: 'Admin',
          email: adminEmail,
          password: await bcrypt.hash('admin123', 10),
          role: 'librarian',
        },
        });

      console.log('✔️ Admin user created automatically');
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}