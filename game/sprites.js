const pisserSprite = ['#000000','#000000','#000000','#000000',
'#000000','#00FFFF','#00FFFF','#00FFFF','#00FFFF','#00FFFF',
'#00FFFF','#000000','#000000','#000000','#000000','#000000',
'#000000','#000000','#000000',
'#000000','#00FFFF','#00FFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF',
'#00FFFF','#00FFFF','#000000','#000000','#000000','#000000','#000000',
'#000000','#000000','#000000','#00FFFF','#FFFFFF','#0000FF','#FFFFFF',
'#FFFFFF','#0000FF','#FFFFFF','#00FFFF','#000000','#000000','#000000',
'#FFFF00','#000000','#000000','#000000','#000000','#000000','#FFFFFF',
'#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#000000','#000000',
'#000000','#FFFF00','#FFFF00','#000000','#000000','#000000','#000000',
'#000000','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF',
'#000000','#000000','#000000','#FFFF00','#FFFF00','#000000','#000000',
'#000000','#FFFF00','#FFFF00','#FFFF00','#FFFF00','#FFFF00','#FFFF00',
'#FFFF00','#FFFF00','#FFFF00','#FFFF00','#000000','#FFFF00','#FFFF00',
'#000000','#FFFF00','#FFFF00','#FFFF00','#FF0000','#FF0000','#FF0000',
'#FF0000','#0000FF','#0000FF','#0000FF','#FF0000','#FFFF00','#FFFF00',
'#FFFF00','#FFFF00','#FFFF00','#FFFF00','#FFFF00','#FFFF00','#FF0000',
'#FF0000','#0000FF','#FF0000','#FF0000','#FF0000','#0000FF','#FF0000',
'#FFFF00','#FFFF00','#FFFF00','#000000','#FFFF00','#FFFF00','#000000',
'#FFFF00','#FF0000','#FF0000','#FF0000','#FF0000','#FF0000','#FF0000',
'#0000FF','#FF0000','#FFFF00','#000000','#000000','#000000',
'#FFFF00','#FFFF00','#000000','#FFFF00','#FF0000','#FF0000','#0000FF',
'#FF0000','#FF0000','#FF0000','#0000FF','#FF0000','#FFFF00','#000000',
'#000000','#000000','#FFFF00','#000000','#000000','#FFFF00','#FF0000',
'#0000FF','#FF0000','#FF0000','#0000FF','#0000FF','#0000FF','#FF0000',
'#FFFF00','#000000','#000000','#000000','#000000','#000000','#000000',
'#FFFF00','#FFFF00','#FFFF00','#FFFF00','#FFFF00','#FFFF00','#FFFF00',
'#FFFF00','#FFFF00','#FFFF00','#000000','#000000','#000000','#000000',
'#000000','#000000','#00FF00','#00FF00','#00FF00','#00FF00','#00FF00',
'#00FF00','#00FF00','#00FF00','#00FF00','#00FF00','#000000','#000000',
'#000000','#000000','#000000','#000000','#00FF00','#00FF00','#00FF00',
'#00FF00','#00FF00','#00FF00','#00FF00','#00FF00','#00FF00','#00FF00',
'#000000','#000000','#000000','#000000','#000000','#000000','#00FF00',
'#00FF00','#00FF00','#000000','#000000','#000000','#000000','#00FF00',
'#00FF00','#00FF00','#000000','#000000','#000000','#000000','#000000',
'#000000','#00FF00','#00FF00','#00FF00','#000000','#000000','#000000',
'#000000','#00FF00','#00FF00','#00FF00','#000000','#000000','#000000']

const basicEnemy = ['#000000','#000000','#000000','#000000','#000000','#000000','#FF0000','#FF0000','#FF0000','#FF0000','#000000','#000000','#000000','#000000','#000000','#000000',
'#000000','#000000','#000000','#000000','#FF0000','#FF0000','#FF0000','#FF0000','#FF0000','#FF0000','#FF0000','#FF0000','#000000','#000000','#000000','#000000',
'#000000','#000000','#000000','#FF0000','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FF0000','#000000','#000000','#000000',
'#000000','#000000','#000000','#FF0000','#FFFFFF','#00FF00','#FF0000','#FFFFFF','#FFFFFF','#FF0000','#00FF00','#FFFFFF','#FF0000','#000000','#000000','#000000',
'#000000','#000000','#FFFFFF','#FFFFFF','#FFFFFF','#FF0000','#00FF00','#FFFFFF','#FFFFFF','#00FF00','#FF0000','#FFFFFF','#FFFFFF','#FFFFFF','#000000','#000000',
'#000000','#000000','#000000','#FF0000','#FFFFFF','#FFFFFF','#FFFFFF','#FF0000','#FF0000','#FFFFFF','#FFFFFF','#FFFFFF','#FF0000','#000000','#000000','#000000',
'#000000','#000000','#000000','#FF0000','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FF0000','#000000','#000000','#000000',
'#000000','#000000','#000000','#000000','#FF0000','#FF0000','#0000FF','#0000FF','#0000FF','#0000FF','#FF0000','#FF0000','#000000','#000000','#000000','#000000',
'#000000','#000000','#000000','#000000','#000000','#FF0000','#0000FF','#FF0000','#FF0000','#0000FF','#FF0000','#000000','#000000','#000000','#000000','#000000',
'#000000','#000000','#FF0000','#FF0000','#FFFFFF','#FF0000','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FF0000','#FFFFFF','#FF0000','#FF0000','#000000','#000000',
'#000000','#000000','#000000','#FF0000','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FF0000','#000000','#000000','#000000',
'#000000','#000000','#000000','#000000','#FFFFFF','#FF0000','#FF0000','#FF0000','#FF0000','#FF0000','#FF0000','#FFFFFF','#000000','#000000','#000000','#000000',
'#000000','#000000','#000000','#000000','#FFFFFF','#FF0000','#FF0000','#FF0000','#FF0000','#FF0000','#FF0000','#FFFFFF','#000000','#000000','#000000','#000000',
'#000000','#000000','#000000','#FF0000','#FF0000','#FF0000','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FF0000','#FF0000','#FF0000','#000000','#000000','#000000',
'#000000','#000000','#000000','#FF0000','#FF0000','#000000','#000000','#000000','#000000','#000000','#000000','#FF0000','#FF0000','#000000','#000000','#000000',
'#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000',
]
