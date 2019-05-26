<template>
  <div class="container-fluid py-3">
    <div class="row">
      <div class="col-md-6 mx-auto">
        <div class="card card-body">
          <h3 class="text-center mb-4">Register</h3>
          <fieldset>
            <div class="form-group has-error">
              <input class="form-control input-lg"
                     placeholder="Username" name="username" type="text"
              >
            </div>
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
            <div class="form-group has-success">
              <input class="form-control input-lg"
                     placeholder="Confirm Password" name="password" value="" type="password"
              >
            </div>
            <div class="checkbox">
              <label class="small">
                <input name="terms" type="checkbox">
                I have read and agree to the
                <a href="#">terms of service</a>
              </label>
            </div>
            <input class="btn btn-lg btn-primary btn-block" value="Create account" type="submit">
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>
