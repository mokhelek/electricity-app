function Electricity(availUnits, unitsTotal, amountTotal) {
    // do we want to go with this or array?
    let appliances = {
        Stove: 10,
        Kettle: 5,
        TV: 3,
        Fridge: 13,
    };

    // * Electricity units prices
    let unitsPrice = {
        10: 7,
        20: 14,
        50: 35,
        advance: 21,
    };

    let unitsAvailable = availUnits || 0; // total units available

    let advancedAmount = 0; // * This should be money, not units

    let theTotalAmountSpent = amountTotal || 0;
    let theTotalUnitsBought = unitsTotal || 0;

    function topUpElectricity(amount) {
        /*
         * if the amount is advance
         * check if the user owes any money
         * if they owe any money then they cannot take any more advance
         * if the amount is a top-up
         * then pay the advance money
         * meaning that the amount that I buy the units with should be difference after the debt money is payed
         */

        // if you want advanced but you did not fully pay
        if (amount == "advance" && advancedAmount > 0) {
            return "pay full amount";
        } else {
            if (advanceTaken()) {
                // * if the debt is more than what the user recharges then take all the money and no units added
                if (advancedAmount >= amount) {
                    advancedAmount -= amount;
                } else {
                    let remainingAfterDeduction = amount - advancedAmount;
                    // * debt is cleared
                    advancedAmount = 0;
                    unitsAvailable += unitsPrice[remainingAfterDeduction];
                }
            } else {
                if (amount == "advance") {
                    advancedAmount = 30;
                }
                unitsAvailable += unitsPrice[amount];
            }
        }

        if (amount != "advance") {
            theTotalAmountSpent += amount;
            theTotalUnitsBought += unitsPrice[amount];
        }
    }

    function getUnitsAvailable() {
        return unitsAvailable;
    }

    /*
     * return true and subtract from unit available if there is enough units to use the appliance
     * other wise return false and do nothing.
     */
    function useAppliance(appliance) {
        if (unitsAvailable >= appliances[appliance]) {
            unitsAvailable -= appliances[appliance];
            return true;
        } else {
            return false;
        }
    }

    function advanceTaken() {
        if (advancedAmount > 0) {
            return true;
        } else {
            return false;
        }
    }

    function totalAmountSpent() {
        return theTotalAmountSpent;
    }

    function totalUnitsBought() {
        return theTotalUnitsBought;
    }

    return {
        advanceTaken,
        topUpElectricity,
        getUnitsAvailable,
        useAppliance,
        totalAmountSpent,
        totalUnitsBought,
    };
}
