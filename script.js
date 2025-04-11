function generateCode() {
  var uid = document.getElementById("uid").value;

  if (!uid) {
      alert("Please enter a UID!");
      return;
  }

  // Example: Generate the redeem code (this would be your pattern)
  var redeemCode = generateRedeemCode(uid);

  // Display the redeem code
  document.getElementById("redeemCode").innerHTML = "Redeem Code: " + redeemCode;
}

// This is where you can use your custom redeem code generation logic.
function generateRedeemCode(uid) {
  // Example pattern generation from UID (you can replace this logic)
  var reversed = uid.split("").reverse().join("");
  var letters = reversed.split("").map(function (digit) {
      return String.fromCharCode(65 + parseInt(digit));  // Convert digit to letter
  });

  var code = letters.join('');
  return code;
}
