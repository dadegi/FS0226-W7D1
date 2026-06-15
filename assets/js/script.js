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
