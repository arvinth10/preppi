from flask import Flask, render_template, redirect, jsonify, url_for, request, session
from flask_restful import Api
from wtforms import SelectField

# initalize server
app = Flask(__name__, template_folder='views', static_folder='public')
api = Api(app)


@app.route('/api/stats')
def stats():
    mostMissed = request.args.get('mostMissed')
    missedNum = request.args.get('missedNum')
    addedNum = request.args.get('addedNum')
    hitRate = request.args.get('hitRate')
    missedResults = request.args.get('missedResults')
    addedResults = request.args.get('addedResults')
    return render_template("index.html", mostMissed=mostMissed, missedNum=missedNum, addedNum=addedNum, hitRate=hitRate,
                           missedResults=missedResults, addedResults=addedResults)

if __name__ == '__main__':
    app.run(debug=True, host='100.64.214.107')
