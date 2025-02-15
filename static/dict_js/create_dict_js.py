# 重複したデータを削除するスクリプト
print('test')
import os
# import pandas as pd
from pathlib import Path
import ast
# Pathオブジェクトを生成
print('test')

outText = ''
outArr = {}

# 成形してくれる関数
def index_idiom(idiom, meaning):
    global outText
    for _idiom in idiom:
        _idiom = _idiom.strip(' ')
        # ダブルコートはシングルコートに書き換える
        outMeaning = meaning.replace('\"', '\'')

        outText += ("\"{0}\" : \"{1}\",".format(_idiom, outMeaning))

# ソースのディレクトリの指定
p = Path('/Users/abekeishi/Public/2.Programing/GsAcademy_講義資料/20190526_JS選手権開発/JS_App/static/dict_js/src')

pathlist = list(p.glob("*.txt"))
print(len(pathlist))
count = 0

# 成形されたファイルを生成する
for _path in pathlist:
    p = Path(_path)
    currfile = os.path.basename(p)
    print(currfile)
    text = open(p).readlines()

    for _txt in text:
        linetext = _txt.strip()
        linetext = linetext.split('\t')
        idiom = linetext[0].split(',')
        index_idiom(idiom, linetext[1])

    fileoutTxt = '{'+outText+'}'
    path_w = '/Users/abekeishi/Public/2.Programing/GsAcademy_講義資料/20190526_JS選手権開発/JS_App/static/dict_js/dict_format_src/' + 'dict_'+currfile
    with open(path_w, mode='w') as f:
        f.write(fileoutTxt)

    outText = ''
    fileoutTxt = ''

# 終わったらJS用のファイルを生成する
p = Path('/Users/abekeishi/Public/2.Programing/GsAcademy_講義資料/20190526_JS選手権開発/JS_App/static/dict_js/dict_format_src/')
path_w = '/Users/abekeishi/Public/2.Programing/GsAcademy_講義資料/20190526_JS選手権開発/JS_App/static/dict_js/dict_src.js'
pathlist = list(p.glob("*.txt"))
pathlist.sort()
# print(pathlist)
for _path in pathlist:

    filename = os.path.basename(_path)
    name, ext = os.path.splitext(filename)
    indexname = 'index_' +  name[len(name)-1]
    print(indexname)

    text = open(_path).readlines()
    t = text[0]
    t = t[:(len(t)-2)]
    with open(path_w, mode='a') as f:
        f.write('const '+indexname +' = '+ t + '};')

# for _path in pathlist:



# line = text.strip()
# print(line)


#
#
# pathlist = list(p.glob("*.txt"))
#
# print(len(pathlist))
# count = 0
#
# for _path in pathlist:
#     open(_path).readlines()
#
#     # print(os.path.basename(_path), lines)
# print(count)
#
# text = "magnetize	…‘に'磁気を帯びさせる / 〈人〉‘を'引き付ける,魅する"
# a = text.split(',')
# print(a)


# all_lines = 0
# for _path in pathlist:
#     hoge = pd.read_csv(_path)
#     hoge.sort_values(by=['スポット','所在地'])
#     no_duplicated_hoge = hoge.drop_duplicates(subset=['スポット','所在地','オプションエリア'],keep='first')
#     no_duplicated_hoge.to_csv(_path, index=False)
