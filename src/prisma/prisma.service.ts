import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import 'dotenv/config';


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaLibSql({
      url: process.env.DATABASE_URL ?? 'file:./library.db',
});

super({ adapter });}



/*


import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaLibSql } from '@prisma/adapter-libsql';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaLibSql({
      url: process.env.DATABASE_URL ?? 'file:./dev.db',
    });

    super({ adapter });
  }
}



































*/

































  async onModuleInit() {
    await this.$connect();

    // إنشاء أدمن ثابت إذا غير موجود
    const adminEmail = 'admin@example.com';

    const admin = await this.member.findUnique({
      where: { email: adminEmail },
    });

    if (!admin) {
      await this.member.create({
        data: {
          name: 'Admin',
          email: adminEmail,
          role: 'librarian',
        },
      });

      console.log('✔ Admin user created automatically');
    }
  }
}