from flask import jsonify
from flask import Flask
import random
import string
import numpy as np

app = Flask(__name__)

TISSUES = sorted(['prostate','salivary_glands','liver','kidney', 'heart', 'immune'])
TARGETCLASS = ['transporter','peptidase']

def generate_random_expression_data(low,up):
    data = []
    for i in range(random.randint(0,100)+500):
        tissue = random.choice(TISSUES)
        value = random.randint(low,up)+random.random()
        data.append({'tissue': tissue, 'expression': value})
    return data

def generate_random_string(low, up):
    return ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(random.randint(low, up)))
@app.route('/expressiondata/<gene>')
def expression_data(gene):
    data = {}
    data['geo']= generate_random_expression_data(4,18)
    data['gtex'] = generate_random_expression_data(0,10)
    return jsonify(data)

@app.route('/statisticstable')
def statistics_table():
    data = []
    for i in range(random.randint(80,120)):
        symbol = generate_random_string(2,6)
        targetclass = random.choice(TARGETCLASS)
        zscore_kidney = np.random.normal()
        zscore_liver = np.random.normal()
        zscore_prostate = np.random.normal()
        zscore_salgland = np.random.normal()
        zscore_sum = zscore_prostate+zscore_liver+zscore_kidney+zscore_salgland
        currow = dict(symbol=symbol, targetclass=targetclass, zscore_sum = zscore_sum, zscore_kidney = zscore_kidney, zscore_liver=zscore_liver, zscore_prostate=zscore_prostate, zscore_salgland=zscore_salgland)
        data.append(currow)

    return jsonify(data)


if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 3001, debug=True)