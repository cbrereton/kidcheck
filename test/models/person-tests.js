"use strict";
!function() {
    let assert = require('assert'),
        Person = require('../../server/models/person.js');

    describe('Person', () => {
        describe('#constructor', () => {
            it('should copy fields from passed in data', done => {
                let p = new Person({
                    id: 123,
                    firstName: 'Caleb',
                    lastName: 'Everett',
                    middleInitial: 'A',
                    gender: 'male',
                    birthday: '1995-02-15'
                });

                assert(p);
                assert(p.firstName === 'Caleb');
                assert(p.lastName === 'Everett');
                assert(p.middleInitial === 'A');
                assert(p.gender === 'male');
                assert(p.birthday === '1995-02-15');
                done();
            });
        });

        describe('#getFullName', () => {
            it('should return correctly formatted full names', done => {
                let p1 = new Person({
                    id: 123,
                    firstName: 'Caleb',
                    lastName: 'Everett',
                    middleInitial: 'A',
                    gender: 'male',
                    birthday: '1995-02-15'
                });
                let p2 = new Person({
                    id: 124,
                    firstName: 'Caleb',
                    lastName: 'Everett',
                    gender: 'male',
                    birthday: '1995-02-15'
                });

                assert(p1.getFullName() === 'Caleb A. Everett');
                assert(p2.getFullName() === 'Caleb Everett');
                done();
            });
        });

        describe('#toString', () => {
            it('should return a correctly formatted string', done => {
                let p = new Person({
                    id: 123,
                    firstName: 'Caleb',
                    lastName: 'Everett',
                    middleInitial: 'A',
                    gender: 'male',
                    birthday: '1995-02-15'
                });

                assert(p.toString() === '[Person #123 "Caleb A. Everett"]');
                done();
            });
        });

        describe('#validate', () => {
            it('should require "firstName", "lastName", "gender", and "birthday"', done => {
                let p = new Person({
                    id: 123,
                    created: 123,
                    modified: 123,

                    firstName: 'Caleb',
                    lastName: 'Everett',
                    middleInitial: 'A',
                    gender: 'male',
                    birthday: '1995-02-15'
                });

                p.firstName = null;
                p.lastName = null;
                p.gender = null;
                p.birthday = null;

                assert(p.validate().length === 4);
                done();
            });

            it('should only allow one letter for "middleInitial", should only match yyyy-mm-dd format for "birthday", and should only allow "male"/"female" for "gender"', done => {
                let p = new Person({
                    id: 123,
                    created: 123,
                    modified: 123,

                    firstName: 'Caleb',
                    lastName: 'Everett',
                    middleInitial: 'A',
                    gender: 'male',
                    birthday: '1995-02-15'
                });

                p.middleInitial = 'more than 1';
                p.gender = 'vegetable';
                p.birthday = 'some time';

                assert(p.validate().length === 3);
                done();
            });
        });
    });
}();
