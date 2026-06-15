const studentList = document.querySelector('#studentList');

class Student {
	constructor(_studentName, _studentSurname, _studentAge, _iscritto) {
		this.studentName = _studentName;
		this.studentSurname = _studentSurname;
		this.studentAge = _studentAge;
		this.iscritto = _iscritto;
	}

	register() {
		let subscription;
		if (this.iscritto) {
			subscription = 'iscritto';
		} else {
			subscription = 'non iscritto';
		}
		const newLi = document.createElement('li');
		newLi.textContent = `Studente ${this.studentName} ${this.studentSurname}, di anni ${this.studentAge} risulta ${subscription}`;
		studentList.appendChild(newLi);
	}
}

const student1 = new Student('Mario', 'Rossi', 25, true);
const student2 = new Student('Aldo', 'Bianchi', 24, false);
const student3 = new Student('Giovanna', 'Verdi', 26, true);

student2.studentName = 'Nicola';

student1.register();
student2.register();
student3.register();

class Music {
	// Superclasse
	constructor(_title, _author, _year, _genre) {
		this.title = _title;
		this.author = _author;
		this.year = _year;
		this.genre = _genre;
	}

	print() {
		let myString = `${this.title} di ${this.author}`;
		return myString;
	}
}

class Vynil extends Music {
	// Sottoclasse di Music
	constructor(_title, _author, _year, _genre, _type, _number) {
		super(_title, _author, _year, _genre);
		this.type = _type;
		this.number = _number;
	}

	print() {
		let myString = ` in formato ${this.type}`;
		console.log(super.print() + myString);
	}
}

class CompactDisc extends Music {
	// Sottoclasse di Music
	constructor(_title, _author, _year, _genre, _format) {
		super(_title, _author, _year, _genre);
		this.format = _format;
	}
}

class Cassette extends CompactDisc {
	// Sottoclasse di CompactDisc, a sua volta sottoclasse di Music
	constructor(_title, _author, _year, _genre, _format, _duration) {
		super(_title, _author, _year, _genre, _format);
		this.duration = _duration;
	}
}

class Digital extends Music {
	constructor(_title, _author, _year, _genre, _dimension) {
		super(_title, _author, _year, _genre);
		this.dimension = _dimension;
	}
}

const vynil1 = new Vynil('Animals', 'Pink Floyd', '1976', 'prog', '33r', 2);
vynil1.print();

const cd1 = new CompactDisc('Requiem', 'Mozart', '1791', 'classica', 'SACD');
console.log(cd1.print());

const digital1 = new Digital(
	'Wonderwall',
	'Oasis',
	'1994',
	'pop rock',
	'3.85Mb',
);
console.log(digital1.print());

// Proprietà statiche
class Libro {
	static contatore = 0;
	constructor(_titolo) {
		Libro.contatore++;
		this.titolo = _titolo;
	}
}

const libro1 = new Libro('Il nome della rosa');
const libro2 = new Libro('Oceano mare');

console.log(libro1, libro2, `Totale libri: ${Libro.contatore}`);

// Proprietà private
class ContoCorrente {
	#saldo = 0;
	#interesse = 0;
	constructor(_iniziale) {
		this.saldo = _iniziale;
	}

	get saldo() {
		return this.#saldo;
	}

	set saldo(importo) {
		if (importo < 50) {
			console.log('Saldo troppo basso');
			this.#saldo = importo;
			return;
		}
		this.#saldo += importo;
		this.#interesse = this.#saldo * 0.1;
		this.#saldo += this.#interesse;
	}
}

const myAccount = new ContoCorrente(30);

console.log(myAccount.saldo);
