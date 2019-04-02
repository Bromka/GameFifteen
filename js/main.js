//создаем массив игрового поля.


function arrP(){
        var massP = [];
        var num = [];


            //делаем массив num 0-15
            for (var i=0; i<16; i++){
                num[i]=i;
            }
            //функция сортировки массива
            function randomSort(){
                return Math.random() - 0.5;
            }

            //перемешиваем массив
            num.sort(randomSort);

            var n = 0;
            for (var i = 0; i<4; i++){
                massP[i] = [];
                for (var j = 0; j<4; j++){
                    
                    massP[i][j] = num[n];  
                    n++;
                }
            }
        return massP;
    }

var massP = arrP()

//отрисовка поля
var field = document.getElementById('gamefield');

   

   
for (var i=0; i<16; i++){
    field.insertAdjacentHTML('beforeend', '<div class="block">' + i + '</div>');
}

/*     console.log (field);
    console.log (massP); */


//случайный цвет

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    var btn = document.getElementsByTagName("input");
    btn[0].style.background = color;
    return color;
  }
  


//отрисовка поля:


var canvas = document.getElementById('gamefield');
var context = canvas.getContext('2d');

//функция отрисовки поля
var color = getRandomColor();

function drawField(){
    
    context.clearRect(0, 0, 400, 400)
    for (var i = 0; i<4; i++){
        for (var j = 0; j<4; j++){
            var x=j*100, y=i*100;
            
            if (massP[i][j] != 0){
                
                context.fillStyle = color;
                context.fillRect(x+1, y+1, 100-1, 100-1);
        
                
                context.font = "bold 22px sans-serif";
                context.fillStyle='white';
                context.fillText(massP[i][j], x+40, y+50);

/*              context.font = "bold 12px sans-serif";
                
                context.fillText(i, x+30, y+65);
                context.fillText(j, x+60, y+65); */
            }

        
        }
    }
}

//запуск функции отрисовки поля
drawField();

// Сменить поле



canvas.onclick = function(e){

    var xC = Math.trunc(e.offsetX/100);
    var yC = Math.trunc(e.offsetY/100);

    document.getElementsByClassName("stepsValue")[0].innerHTML = steps;
   
    massChange(yC, xC)
    drawField();
    chechVictory();


 
}
var steps = 1;
//функция изменения массива при клике
function massChange(x, y){
    if (massP[x][y] == 0) console.log ('ничего');
    
    
    if (massP[x][y-1] == 0){
     
        massP[x][y-1] = massP[x][y];
        massP[x][y] = 0;
        steps++;
        return
    }
    if (massP[x][y+1] == 0){
        
        massP[x][y+1] = massP[x][y];
        massP[x][y] = 0;
        steps++;
        return
    }
    if (x>0 && massP[x-1][y] == 0){
        
        massP[x-1][y] = massP[x][y];
        massP[x][y] = 0;
        steps++;
        return
    }
    if (x<3 && massP[x+1][y] == 0){
        massP[x+1][y] = massP[x][y];
        massP[x][y] = 0;
        steps++;
        return
    }
}
//проверка на победу
var victoryMas = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0],
];

function chechVictory(){
    if (massP[0] == victoryMas[0]){
        alert ('поздравляю');
    }
}

//кнопка Заного
document.getElementsByClassName("btn")[0].onclick = function(){
    steps = 1;
    document.getElementsByClassName("stepsValue")[0].innerHTML = steps;

    massP = arrP()
    drawField();
}




