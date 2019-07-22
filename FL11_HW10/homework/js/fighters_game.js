function Fighter(obj){
    const name = obj.name;
    const damage = obj.damage;
    const agility = obj.agility;
    const maxHp = obj.hp;
    const maxСhance = 100;
    let hp = obj.hp;
    let wins = 0;
    let losses = 0;

    this.getName = function(){
        return name;
    }

    this.getDamae = function(){
        return damage;
    }

    this.getAgility = function(){
        return agility;
    }

    this.getHealth = function(){
        return hp;
    }

    this.logCombatHistory = function(){
        console.log(`Name: ${name}, Wins: ${wins}, Losses: ${losses}`);
    }

    this.heal = function(restorativeHp){
        if(restorativeHp > maxHp){
            hp = maxHp;
        } else {
            hp += restorativeHp;
        }
    }

    this.dealDamage = function(enemyDamage){
        hp -= enemyDamage;
        if(hp <= 0) {
            hp = 0;
        }
    }

    this.addWin = function(){
        wins++;
    }

    this.addLoss = function(){
        losses++;
    }

    this.attack = function(enemy){
       let successfulAttack = Math.floor(Math.random() * maxСhance) + 1;
        if(successfulAttack <= maxСhance - enemy.getAgility()){
            enemy.dealDamage(this.getDamae());
            console.log(`${this.getName()} make ${this.getDamae()} to ${enemy.getName()}`);
        } else {
            console.log(`${this.getName()} attack missed`);
        }
    }
}

function battle(fighter1, fighter2){
    let fighting = true;
    if(fighter1.getHealth() <= 0){
        console.log(`${fighter1.getName()} is dead and can't fight`);
        return;
    } else if(fighter2.getHealth() <= 0){
        console.log(`${fighter2.getName()} is dead and can't fight`);
        return;
    }
        do{
            fighter1.attack(fighter2);
            
            if(fighter2.getHealth() <= 0){
                fighter1.addWin();
                fighter2.addLoss();
                fighting = false;
                break;
            }

            fighter2.attack(fighter1);

            if(fighter1.getHealth() <= 0){
                fighter2.addWin();
                fighter1.addLoss();
                fighting = false;
            }
        }while(fighting);   
}


