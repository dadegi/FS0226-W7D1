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

// Esempio setter completo
console.log('----------------------------------------')
console.log('----- Esempio carrello prodotti con getter/setter -----');

class Carrello {
	// Proprietà private native (accessibili solo dentro questa classe)
	#prodotti = [];
	#totale = 0;

	constructor(_utente) {
		this.utente = _utente;
	}

	// GETTER: Restituisce l'elenco dei prodotti (sola lettura)
	get prodotti() {
		return this.#prodotti;
	}

	// GETTER: Restituisce il totale aggiornato
	get totale() {
		return this.#totale;
	}

	// SETTER: Aggiunge un prodotto eseguendo validazioni e calcoli
	set nuovoProdotto(prodotto) {
		// 1. Validazione della struttura dell'oggetto
		if (!prodotto || typeof prodotto !== 'object') {
			console.error('Errore: Il prodotto deve essere un oggetto valido.');
			return;
		}

		if (
			!prodotto.nome ||
			typeof prodotto.prezzo !== 'number' ||
			prodotto.prezzo <= 0
		) {
			console.error(
				`Errore: Dati prodotto non validi per "${prodotto.nome}". Il prezzo deve essere maggiore di 0.`,
			);
			return;
		}

		// 2. Controllo dei duplicati: se esiste già, aumenta solo la quantità
		const prodottoEsistente = this.#prodotti.find(
			(product) => product.nome === prodotto.nome,
		);
		const quantitadaAggiungere = prodotto.quantita || 1;

		if (prodottoEsistente) {
			prodottoEsistente.quantita += quantitadaAggiungere;
		} else {
			// Inserisce il nuovo prodotto con quantità di default a 1
			this.#prodotti.push({
				nome: prodotto.nome,
				prezzo: prodotto.prezzo,
				quantita: quantitadaAggiungere,
			});
		}

		// 3. Effetto collaterale automatico: ricalcola il totale del carrello
		this.#ricalcolaTotale();
		console.log(
			`[Carrello ${this.utente}]: Aggiunto "${prodotto.nome}" (x${quantitadaAggiungere})`,
		);
	}

	// Metodo privato di supporto per il ricalcolo
	#ricalcolaTotale() {
		this.#totale = this.#prodotti.reduce(
			(acc, prod) => acc + prod.prezzo * prod.quantita,
			0,
		);
	}
}

// --- UTILIZZO PRATICO ---

const mioCarrello = new Carrello('Marco');

// 1. Aggiunta di un prodotto valido
mioCarrello.nuovoProdotto = { nome: 'Smartphone', prezzo: 599, quantita: 1 };
// Output: [Carrello Marco]: Aggiunto "Smartphone" (x1)

// 2. Aggiunta di un secondo prodotto dello stesso tipo (aggiorna la quantità)
mioCarrello.nuovoProdotto = { nome: 'Smartphone', prezzo: 599, quantita: 2 };
// Output: [Carrello Marco]: Aggiunto "Smartphone" (x2)

// 3. Tentativo di inserimento di un prodotto non valido (prezzo negativo)
mioCarrello.nuovoProdotto = { nome: 'Cuffie Fallate', prezzo: -20 };
// Output: Errore: Dati prodotto non validi per "Cuffie Fallate". Il prezzo deve essere maggiore di 0.

// 4. Aggiunta di un prodotto diverso
mioCarrello.nuovoProdotto = { nome: 'Cover Rigida', prezzo: 20 };
// Output: [Carrello Marco]: Aggiunto "Cover Rigida" (x1)

// 5. Verifica dello stato finale tramite i Getter
console.log('Prodotti nel carrello:', mioCarrello.prodotti);
/* Output:
[
  { nome: 'Smartphone', prezzo: 599, quantita: 3 },
  { nome: 'Cover Rigida', prezzo: 20, quantita: 1 }
]
*/

console.log(`Totale da pagare: €${mioCarrello.totale}`);
// Output: Totale da pagare: €1817 ( (599 * 3) + 20 )
