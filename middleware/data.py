from pymongo import MongoClient

# Configuración de conexión a MongoDB
MONGO_URI = "mongodb://192.168.4.7:27017"
DATABASE_NAME = "deposito_soria"
COLLECTION_NAME = "tipos"

# Datos a subir (array de documentos)
array_data = [
   
  { "name": "ELECTRICIDAD" },
  { "name": "LIBRERIA" },
  { "name": "PLOMERIA" },
  { "name": "LIMPIEZA" },
  { "name": "INSUMO INFORMATICO" },
  { "name": "MUEBLES" },
  { "name": "INDUMENTARIA" },
  { "name": "ELECTRODOMESTICOS" },
  { "name": "EQUIPOS MEDICOS" },
  { "name": "ACCESORIO DE COMUNICACION" },
  { "name": "EQUIPOS INFORMATICO" },
  { "name": "FERRETERIA" },
  { "name": "ROPA VARIAS" },
  { "name": "INSUMO MEDICO" },
  { "name": "CARPINTERIA" },
  { "name": "ELECTRO MEDICINA" },
  { "name": "TEXTIL" },
  { "name": "BAZAR" },
  { "name": "ARTICULO DUPLICADO" },
  { "name": "OBSOLETOS" }
]



# Función principal
def subir_array_a_mongo(array, db_name, collection_name):
    try:
        # Conectar al cliente de MongoDB
        client = MongoClient(MONGO_URI)
        print("Conexión exitosa a MongoDB")

        # Seleccionar base de datos y colección
        db = client[db_name]
        collection = db[collection_name]

        # Insertar documentos
        result = collection.insert_many(array)
        print(f"Se insertaron {len(result.inserted_ids)} documentos con éxito.")

    except Exception as e:
        print("Error al conectar o insertar en MongoDB:", e)

    finally:
        # Cerrar la conexión
        client.close()

# Llamar a la función
if __name__ == "__main__":
    subir_array_a_mongo(array_data, DATABASE_NAME, COLLECTION_NAME)
