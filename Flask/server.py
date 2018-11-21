from flask import Flask, jsonify, request, json
from flaskext.mysql import MySQL
from flask_cors import CORS
from flask_restful import Resource, Api
from json import dumps

app = Flask(__name__)
api = Api(app)
mysql = MySQL()

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'ivan'
app.config['MYSQL_DATABASE_PASSWORD'] = 'database123'
app.config['MYSQL_DATABASE_DB'] = 'sistemaliberty'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['MYSQL_CURSORCLASS']='DictCursor'
mysql.init_app(app)

CORS(app)

@app.route('/api/Proveedores', methods =['GET'])
def select_proveedor():
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        #Para llamar a un procedimiento
        cursor.callproc('sp_selectProveedor',())
        #Convertir la consulta en un formato json
        row_headers=[x[0] for x in cursor.description] #this will extract row headers
        data = cursor.fetchall()
        json_data=[]
        for result in data:
            json_data.append(dict(zip(row_headers,result)))
        return jsonify(json_data)
        #return json.dumps(json_data)
    except Exception as e:
        return json.dumps({'error':str(e)})
    finally:
       cursor.close()
       conn.close()

@app.route('/api/Proveedor', methods =['POST'])
def create_proveedor():
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        _nombre = request.get_json()['nombre'];
        _telefono = request.get_json()['telefono'];
        _correo = request.get_json()['correo'];
        _ubicacion = request.get_json()['ubicacion'];
        #_nombre = "Proveedro desde Flask"
        #_telefono = 75456844;
        #_correo = 'flask@gmail.com'
        #_ubicacion = "En ningun lugar"
        #Para llamar a un procedimiento
        cursor.callproc('sp_createProveedor',(_nombre,_telefono,_correo,_ubicacion))
        data = cursor.fetchall()
        if len(data) is 0:
            conn.commit()
            return json.dumps({'message':'Query executed successfully !'})
        else:
            return json.dumps({'error':str(data[0])})
        return jsonify(json_data)
    except Exception as e:
        return json.dumps({'error':str(e)})
    finally:
       cursor.close()
       conn.close()

@app.route('/api/Proveedor/<id>', methods =['PUT'])
def update_proveedor(id):
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        _nombre = request.get_json()['nombre'];
        _telefono = request.get_json()['telefono'];
        _correo = request.get_json()['correo'];
        _ubicacion = request.get_json()['ubicacion'];
        #_nombre = "Proveedro desde Flask"
        #_telefono = 75456844;
        #_correo = 'flask@gmail.com'
        #_ubicacion = "En ningun lugar"
        #Para llamar a un procedimiento
        cursor.callproc('sp_updateProveedor',(_nombre,_telefono,_correo,_ubicacion,id))
        data = cursor.fetchall()
        if len(data) is 0:
            conn.commit()
            return json.dumps({'message':'Query executed successfully !'})
        else:
            return json.dumps({'Error':str(data[0])})
        return jsonify(json_data)
    except Exception as e:
        return json.dumps({'error':str(e)})
    finally:
       cursor.close()
       conn.close()

if __name__ == "__main__":
    app.run(debug=True)
