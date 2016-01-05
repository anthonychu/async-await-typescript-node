"use strict";
import api = require("./api");

const AVAILABLE = 'available';
const BASE_URL = 'http://petstore.swagger.io/v2';

let petApi = new api.PetApi('', BASE_URL);
let storeApi = new api.StoreApi('', BASE_URL);

try {
    storeApi.getInventory().then(inventoryResponse => {
        let inventorySummary = inventoryResponse.body;
        console.log('Pet Statuses:');
        for (let status of Object.keys(inventorySummary)) {
            console.log(`${status} - ${inventorySummary[status]}`);
        }

        if (inventorySummary[AVAILABLE] > 0) {
            petApi.findPetsByStatus(AVAILABLE).then(petResponse => {
                let availablePets = petResponse.body;
                console.log('\n\nAvailable Pets:');
                availablePets.map(p => console.log(`${p.id} - ${p.name}`));
            }).catch(e => {
                // if promise from findPetsByStatus() is rejected or exception thrown in callback
            });
        }
    }).catch(e => {
        // if promise from getInventory() is rejected or exception thrown in callback
    });
} catch (e) {
    // does this catch anything?
}

