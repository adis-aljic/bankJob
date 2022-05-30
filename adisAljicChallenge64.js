// funkcija za importovanje fajla sa spiskom ljudi

const importNamesAndCreateListOfPeople = (txtFile) => {
    let temp = [];

    const { count } = require('console');
    const { readFileSync, promises: fsPromises, copyFile } = require('fs');
    const { prependOnceListener } = require('process');
    const { addAbortSignal } = require('stream');
    const { threadId } = require('worker_threads');
    const contents = readFileSync(txtFile, 'utf-8');
    temp = contents.split(/\r?\n/);
    for (let i = 0; i < temp.length; i++) {
        const element = temp[i];

    }
    return temp;
}
let listOfPeople = importNamesAndCreateListOfPeople("employees.txt")


// konstruktor za kreiranje objekta transakcije
const createTransaction = (date, firstName, lastName, ID, type, account_ID, JMBG, amount) => {
    return {
        date, // datum transakcije, unosi se kao string
        firstName,
        lastName,
        ID, // id transakcije
        type,
        account_ID, // id akounta sa kojeg se vrsi transakcija
        JMBG, // id osobe koji je ujedno i maticni broj
        amount 

    }
}


createBank = (bank_ID, name, location, accounts = [], transactions = []) => {
    return {
        bank_ID,
        name,
        location,
        accounts,
        transactions,

        openAccount(account) {
            this.accounts.push(account);
            return account;
        },
        // orginalno su bila dva uslova da se moze vrsiti transakcija kao i zatvarati racun, drugi uslov je bio maticni broj
        // ali kako su uvijek generisani random prilikom svako pokretanja programa morao sam to izbaciti 
        closeAccount(person) {
            this.accounts.forEach(account => {
                if (person.account_ID == account.account_ID) { 
                    accounts.splice(accounts.indexOf(account), 1)
                    person.hasAcc = false;
                    person.account_ID = undefined;
                    account.balance = 0;
                }

            });
        },
        deposit(account_ID1, deposit, date) {
            this.accounts.forEach(account => {
                if (account.account_ID == account_ID1) {
                    account.balance += deposit;
                    this.transactions.push(createTransaction(date, account.firstName, account.lastName, transactions.length, "deposit", account.account_ID, account.JMBG, deposit));
                }

            });


        },
        withdraw(account_ID1, withdraw, date) {
            this.accounts.forEach(account => {
                if (account.account_ID == account_ID1) {
                        if( account.balance >= withdraw){
                    account.balance -= withdraw;
                    this.transactions.push(createTransaction(date, account.firstName, account.lastName, transactions.length, "withdraw", account.account_ID, account.JMBG, withdraw));}
                    else console.log("Na  akauntu broj " + account.account_ID + " nemate dovoljno sredstava na racunu");
                }

            });


        },
        checkBalance(account_ID1, date) {
            this.accounts.forEach(account => {
                if (account.account_ID == account_ID1) {
                    console.log("Vas racun iznosi " + account.balance);
                    this.transactions.push(createTransaction(date, account.firstName, account.lastName, transactions.length, "check Balance", account.account_ID, account.JMBG, account.balance));
                }
            });
        },
    }
}

createPerson = (firstName, lastName, birthDate, JMBG) => {
    return {
        firstName,
        lastName,
        birthDate,
        JMBG,  // id korisnika je maticni broj korisnika
        hasAcc: false, // da li osoba ima otvoren acc u bilo kojoj firmi
        account_ID: undefined, // ako ima otvoren da se zna koji mu je id, u stvarnom zivotu to je kartica
        // orginalno sam htio staviti da akount id bude broj od 16 cifara koji je random generisan ali ne bi mogao praiti onda koji je
        // broj racuna koje oosbe pa sam presao na klasicno 1 2 3 itd
    }
}

// funkcije koje generisu datum rodjena osobe i njegov jmbg
const generateBirthDate = () => {
    const leapYears = [1940, 1944, 1948, 1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004]
    let year = Math.trunc(Math.random() * 65 + 1939)        //1939 do 2004 od 18god do 65 godina
    let month = Math.trunc(Math.random() * 11 + 1)
    let day = 0;
    if (month == 2) {
        for (let i = 0; i < leapYears.length; i++) {
            const leapYear = leapYears[i];
            if (leapYear == year) {
                day = Math.trunc(Math.random() * 28 + 1)
            }
            else day = Math.trunc(Math.random() * 27 + 1)
        }
    }
    else if (month == 4 || 6 || 9 || 11) day = Math.trunc(Math.random() * 29 + 1)
    else day = Math.trunc(Math.random() * 23 + 1)
    if (day < 10) { day = "0" + day }
    if (month < 10) { month = "0" + month }
    return "" + day + "." + month + "." + year

}
let JMBGS = [];
const generateJMBG = (date) => {
    firstPartOfJMBG = ""
    for (let i = 0; i < date.length; i++) {
        const element = date[i];
        if (element == ".") continue
        else firstPartOfJMBG += element
    }
    let secondPartOfJMBG = Math.trunc(Math.random() * 899999 + 100000)
    let jmbg = 0

    if (!JMBGS.includes(secondPartOfJMBG)) {
        jmbg = firstPartOfJMBG + secondPartOfJMBG
    }
    JMBGS.push(secondPartOfJMBG)
    return jmbg
}
const numberOfCustomores = [];
const addCustomers = (array, number) => {
    // dio koji dodaje 100 ljudi koji ce imati racun u nekoj od banaka
    for (let i = 0; i < number; i++) {
        const person = array[i].split(" ");
        let date = generateBirthDate();
        numberOfCustomores.push(createPerson(person[0], person[1], date, generateJMBG(date),));
    }
}

addCustomers(listOfPeople, 100);


const prvaBanka = createBank(1, "Prva Banka", "Tuzla");
const drugaBanka = createBank(2, "Druga Banka", "Tuzla");
const trecaBanka = createBank(3, "Treca Banka", "Tuzla");




function createAccount(person, account_ID) {
    return {
        firstName: person.firstName,
        lastName: person.lastName,
        JMBG: person.JMBG,
        account_ID,
        balance: 0,
        password: person.JMBG.slice(-6), // pasword osobe je zamisljen kao zadnjih sest brojeva jmbg jer su oni unikatni za svaku osobu
    }
}


const gotCustomers = (bank, array, number) => {
    let cnt = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i].hasAcc == false && cnt < number) {
            const person = array[i]
            // console.log(person)
            bank.openAccount(createAccount(person, i))
            person.hasAcc = true
            person.account_ID = bank.accounts[cnt].account_ID
            cnt++

        }
        else continue
    }

}
// for (let i = 0; i <20; i++) {
//     const person = numberOfCustomores[i];
//     prvaBanka.openAccount(createAccount(person,i))
//     person.hasAcc = true
//     person.account_ID = prvaBanka.accounts[i].account_ID
// }
// for (let i = 20; i < 80; i++) {
//     const person = numberOfCustomores[i];
//     drugaBanka.openAccount(createAccount(person,i))
//     person.hasAcc = true
//     person.account_ID = drugaBanka.accounts[i].account_ID
// }
// for (let i = 80; i < 100; i++) {
//     const person = numberOfCustomores[i];
//     trecaBanka.openAccount(createAccount(person,i))
//     person.hasAcc = true
//     person.account_ID = trecaBanka.accounts[i].account_ID
// }


gotCustomers(prvaBanka, numberOfCustomores, 20)
gotCustomers(drugaBanka, numberOfCustomores, 50)
gotCustomers(trecaBanka, numberOfCustomores, 30)
// console.log(trecaBanka.accounts)


for (let i = 0; i < 10; i++) {
    // izvrseno po deset transakcija po akountu
    // izvrseno po sto transakcija za svaku transakciju
    for (let i = 1; i < 100; i++) {
        trecaBanka.deposit(i, 100, "16.8.2022")
        prvaBanka.deposit(i, 100, "16.8.2022")
        
    }
for (let i = 1; i < 100; i++) {
    
    drugaBanka.checkBalance(i, "17.8.2021")
    trecaBanka.checkBalance(i, "17.8.2021")
}
for (let i = 0; i < 100; i++) {
    trecaBanka.withdraw(i,1, "15.8.2022")    
    prvaBanka.withdraw(i,1, "15.8.2022")    
    drugaBanka.withdraw(i,1, "15.8.2022")    
}
}

// funkcija koja pronalazi odredjeni acc u odredjenoj banci i ispisuje sve njegove transakcije
const findAccount = (account_ID, bank) => {
    bank.accounts.forEach(account => {
        if (account_ID == account.account_ID) console.log(account);
    });
    bank.transactions.forEach(transaction => {
        if (account_ID == transaction.account_ID) console.log(transaction);
    })
}


// findAccount(1, trecaBanka)
console.log(trecaBanka.accounts)  
console.log(numberOfCustomores[99])
// console.log(trecaBanka.accounts[1])
// console.log(numberOfCustomores[1])

const fs = require('fs');

const data_Base = {
    BANKS : [],
    CUSTOMERS : []
}
data_Base.BANKS.push(prvaBanka, drugaBanka, trecaBanka)
data_Base.CUSTOMERS.push(numberOfCustomores)

fs.writeFile("data_Base.json", JSON.stringify(data_Base), function (err) {
    if (err) throw err;
});

console.log(prvaBanka.transactions.length)
console.log(drugaBanka.transactions.length)
console.log(trecaBanka.transactions.length)