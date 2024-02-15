{
	"name": "UsuarioTeste",
	"email": "usuario@teste.com",
	"password": "teste1234",
	"driver_license": "XXXXXX"
}

{
	"name": "UsuarioAdmin",
	"email": "admin@rentalx.com.br",
	"password": "admin",
	"driver_license": "XXXXXX"
}

http://localhost:5555/api-docs/#/

# cadastro de carro

**RF**
deve ser possivel cadastrar um novo carro;

**RN**
não deve ser possivel cadastrar um carro com uma placa ja existente;
não deve ser possivel alterar a placa de um carro ja cadastrado;
O carro deve ser cadastrado com disponibilidade por padrão;
o usuario responsavel pelo cadastro deve ser um usuario administrador


# Listagem de carros

**RF**
deve ser possivel listar todos os carros disponiveis
deve ser possivel listar todos os carros disponiveis pelo nome da categoria
deve ser possivel listar todos os carros disponiveis pelo nome da marca
deve ser possivel listar todos os carros disponiveis pelo nome do carro

**RN**
O usuario não precisa estar logado no sistema


# cadastro de especificação no carro

**RF**
deve ser possivel cadastrar uma especificaçao no carro
deve ser possivel listar todas as especificaçao
deve ser possivel listar todos os carros

**RN**
O carro precisa estar cadastrado para criar uma especificaçao para ele
não deve ser possivel cadastrar uma especificação para um mesmo carro
o usuario responsavel pelo cadastro deve ser um usuario administrador


# cadastro de imagens do carro

**RF**
deve ser possivel cadastrar a imagem do carro 
deve ser possivel listar todos os carros  

**RNF**
utilizar o multer para upload das imagens

**RN**
o usuario deve poder cadastrar mais de uma imagem para o mesmo carro
o usuario responsavel pelo cadastro deve ser um usuario administrador


# aluguel de carro

**RF**
deve ser possivel cadastrar um aluguel

**RN**
O aluguel deve ter duração de no minimo 24 horas
não deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo usuario
não deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo carro