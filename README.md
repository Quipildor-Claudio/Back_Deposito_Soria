# Back_Deposito_Soria
API BACKEND SISTEMA DE DEPOSITO E INVENTARIO DEL SERVICIO DE DEPOSITO HOSP[ITAL PABLO SORIA.

# Project Title

A brief description of what this project does and who it's for


## Authors

- [@octokatherine](https://www.github.com/octokatherine)


## Documentation

[Documentation](https://linktodocumentation)


## Support

For support, email fake@fake.com or join our Slack channel.


## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.

