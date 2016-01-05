"use strict";
import api = require("./api");

(async () => {
    const AVAILABLE = 'available';
    const BASE_URL = 'http://petstore.swagger.io/v2';

    let petApi = new api.PetApi('', BASE_URL);
    let storeApi = new api.StoreApi('', BASE_URL);

    try {
        let {body: inventorySummary} = await storeApi.getInventory();

        console.log('Pet Statuses:');
        for (let status of Object.keys(inventorySummary)) {
            console.log(`${status} - ${inventorySummary[status]}`);
        }

        if (inventorySummary[AVAILABLE] > 0) {
            let {body: availablePets} = await petApi.findPetsByStatus(AVAILABLE);
            console.log('\n\nAvailable Pets:');
            availablePets.forEach(p => console.log(`${p.id} - ${p.name}`));
        }
    } catch (e) {
        // this should catch all exceptions
    }
})();
