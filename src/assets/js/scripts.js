$(document).ready(() => {
   
    $('#menus li:last-child a').tab('show');


    let prescriptionFormFiels = `
    <div class="input-group mb-3">
        <div class="form-floating">
            <select class="form-select" id="floatingSelectGrid" name="gender" required aria-label="Floating label select example">
                <option >Open this select menu</option>
                <option value="Tab">Tablet</option>
                <option value="Inj.">Injection</option>
                <option value="Syp.">Syrup</option>
            </select>
            <label for="floatingSelectGrid">Type</label>
        </div>
        <input type="text" class="form-control" aria-label="Medicine Name">
    </div>



    `;


});