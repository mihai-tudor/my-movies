<template>
  <div class="container-fluid py-3">
    <div class="row">
      <div class="col-md-6 mx-auto">
        <div class="card card-body">
          <h3 class="text-center mb-4">Login</h3>
          <fieldset>
            <div class="form-group has-error">
              <input class="form-control input-lg"
                     placeholder="E-mail Address" name="email" type="text"
              >
            </div>
            <div class="form-group has-success">
              <input class="form-control input-lg"
                     placeholder="Password" name="password" value="" type="password"
              >
            </div>
            <input class="btn btn-lg btn-primary btn-block" value="Login" type="submit">
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>
