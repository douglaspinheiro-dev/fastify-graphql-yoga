exports.seed = (knex, Promise) => knex('usuarios').truncate().then(() => knex('usuarios').insert({
  usuario: '1',
  nome: 'admin',
  email: 'admin@admin.com',
  senha: '$2a$10$WrVHnb/uzDVxi0OGv2UgA.bjb.PeYnRr3mSNfByKrqz8S77AgpY1G',
  created_at: '2024-01-14 14:40:25',
  updated_at: '2024-01-14 14:40:25'

}))
