let JMBGS = []; // array koji sadrzi unikatan dio jmbg 

const importNamesAndCreateListOfPeople = (txtFile) => {
    let temp = [];

    const { count } = require('console');
    const { readFileSync, promises: fsPromises, copyFile } = require('fs');
    const { prependOnceListener } = require('process');
    const { addAbortSignal } = require('stream');
    const { threadId } = require('worker_threads');
    const contents = readFileSync(txtFile, 'utf-8');
    temp = contents.split(/\r?\n/);

    return temp;
}
PEOPLE = importNamesAndCreateListOfPeople("employees.txt")

const BAZA_PODATAKA = {

    BANKS: [],
    CUSTOMERS: [],
    Bank_ID: 1,
    Person_ID: 1,

    addBank(Bank) {
        Bank.ID = this.Bank_ID;
        this.BANKS.push(Bank)
        this.Bank_ID += 1;

        return Bank
    },
    addPerson(person) {
        person.ID = this.Person_ID;
        BAZA_PODATAKA.CUSTOMERS.push(person);
        this.Person_ID += 1;
    }

}

createBank = (name, location, accounts = [], transactions = []) => {
    return {
        name,
        location,
        accounts,
        transactions,

        openAccount(account) {
            accounts.push(account)
            account.hasAcc = true;
            return account;
        },
        closeAccount() {

        },
        deposit() {

        },
        withdraw() {

        },
        checkBalance() {

        }
    }

}

createPerson = (firstName, lastName, birthDate, JMBG, hasAcc) => {

    return {
        firstName,
        lastName,
        birthDate,
        JMBG,
        hasAcc : false
    }
}


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

const addCustomers = (array, number) => {

    // dio koji dodajte 100 ljudi koji ce imati racun u nekoj od banaka
    for (let i = 0; i < number; i++) {
        const person = array[i].split(" ")
        let date = generateBirthDate()
        BAZA_PODATAKA.addPerson(createPerson(person[0], person[1], date, generateJMBG(date)))
    }


}

addCustomers(PEOPLE, 100)


const prvaBanka = BAZA_PODATAKA.addBank(createBank("Prva Banka", "Tuzla"))
const drugaBanka = BAZA_PODATAKA.addBank(createBank("Druga Banka", "Tuzla"))
const trecaBanka = BAZA_PODATAKA.addBank(createBank("Treca Banka", "Tuzla"))

// u prvu banku 20 ljudi otvori racun
// u drugu banku 30 ljudi otvori racun
// u trecu banku 50 ljudi otvori racun

function account(owner) {
    return {
        owner: owner.firstName + " " + owner.lastName,
        acount_ID: Math.trunc(Math.random() * 899),
        balance: 0,
        password: Math.trunc(Math.random() * 899999 + 100000),

    }
}
const addNumbOfCustomersToBank = (bank, number) => {
    for (let i = 0; i < number; i++) {
            const person = BAZA_PODATAKA.CUSTOMERS[i];
            bank.openAccount(account(person))
        
    }
}
addNumbOfCustomersToBank(prvaBanka, 9)



console.log(BAZA_PODATAKA.CUSTOMERS)
