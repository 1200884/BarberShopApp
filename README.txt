BackEnd: NodeJs, usar npm run start nesta pasta
FrontEnd: Angular, usar ng serve nesta pasta
É necessário criar componentes novos no Angular para estabelecimentos novos (client+employee, componente para o clique no estabelecimento e comparar os logins dos vários employees, para cada estabelecimento ver as suas reservas)
Cada nome de estabelecimento é único e o endpoint quando se acede a este deve ser o seu valor em minusculas sem espaços BK Porto=bkporto
Mensagem de nao haver horas disponiveis se o tamanho do array de horas num estabelecimento for 0
Criar um SSO, e por na linha 90 do app.module.ts
Mudar a Base de dados que está na linha 23 do config.js
Usar preferencialmente uma base de dados que armazene vários dados na mesma coluna, por causa dos favoritos (por exemplo postgreSQL)
Elementos para a criação das tabelas da base de dados estão na pasta domain do nodejs