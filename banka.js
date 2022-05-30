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



const BAZA_PODATAKA = {

    BANKS: [],
    CUSTOMERS: [],
    bank_ID: 1,
    person_ID: 1,
    account_ID: 1,
    transaction_ID: 1,

    addBank(bank) {
        bank.ID = this.bank_ID;
        this.BANKS.push(bank)
        this.bank_ID += 1;

        return bank
    },
    addPerson(person) {
        person.ID = this.person_ID;
        BAZA_PODATAKA.CUSTOMERS.push(person);
        this.person_ID += 1;
    },

}




createBank = (name, location, accounts = [], transactions = []) => {
    return {
        name,
        location,
        accounts,
        transactions,

        openAccount(account) {
            this.ID +=1
            this.bank_ID = bank_ID
            this.accounts.push(account)
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

createPerson = (firstName, lastName, birthDate, JMBG) => {

    return {
        firstName,
        lastName,
        birthDate,
        JMBG,
        hasAcc: false

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

const addCustomers = (array, number) => {

    // dio koji dodaje 100 ljudi koji ce imati racun u nekoj od banaka
    for (let i = 0; i < number; i++) {
        const person = array[i].split(" ")
        let date = generateBirthDate()
        BAZA_PODATAKA.CUSTOMERS.push(createPerson(person[0], person[1], date, generateJMBG(date)))
    }


}

addCustomers(listOfPeople, 100)


const prvaBanka = BAZA_PODATAKA.addBank(createBank("Prva Banka", "Tuzla"))
const drugaBanka = BAZA_PODATAKA.addBank(createBank("Druga Banka", "Tuzla"))
const trecaBanka = BAZA_PODATAKA.addBank(createBank("Treca Banka", "Tuzla"))



function createAccount(owner,bank) {
    return {
        owner: owner.firstName + " " + owner.lastName,
        account_ID: 0,
        balance: 0,
        password: owner.JMBG.slice(-6),
        bank_ID: undefined

    }
}
const openAccountsInBank = (number, bank) => {

    for (let i = 0; i < number; i++) {
        const element = BAZA_PODATAKA.CUSTOMERS[i];
        if (!element.hasAcc) {
            bank.openAccount(createAccount(element))
            element.hasAcc = true;
        }

    }

}
openAccountsInBank(prvaBanka, 20)
console.log(prvaBanka.accounts)