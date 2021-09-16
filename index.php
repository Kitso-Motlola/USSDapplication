<?php
//************************************************************************************************************************************************************** */
//
//  This program is used to develop a USSD application for use in offering minibus taxi applications
//  
//  1.  The application is developed in PHP programming language.
//  2.  The application is to be deployed using Heroku.
//  3.  Africa's talking will be used to host the USSD services.
//
//************************************************************************************************************************************************************** */
$sessionId = $_POST["sessionId"];
$serviceCode = $_POST["serviceCode"];
$phoneNumber = $_POST["phoneNumber"];
$text = $_POST["text"];
//_________________________________________________________________________________________________________________________________________________________________
// This is the first menu screen:
if ($text == ""){
    $response = "CON Hello, please select which minibus-taxi service you would like to use: \n";
    $response .= "1. Travel to destination. \n";
    $response .= "2. Register to use services. \n";
}
//___________________________________________________________________________________________________________________________________________________________________
// Second menu screen:
else if($text == "1"){ // Chooses to travel.
    // TO DO : fetch taxi location
    // TO DO : Fetch available destination options
    $response = "CON Please select your destination: \n";
    $response .= "1. The Neelsie. \n";
    $response .= "2. Eikestad Mall. \n";
    $response .= "3. The Engineering Building. \n";
    $response .= "4. Stellmark. \n";
}
else if($text == "2"){ //Chooses to register
    $response = "END Please select your destination: \n";
}
//_____________________________________________________________________________________________________________________________________________________________________
// Third menu screen:
else if($text == "1*1"){
    // TO DO : fetch fee
    $response = "CON  A R10 fee will be charged to your account: \n";
    $response .= "1. Authorise payment. \n";
    $response .= "2. Do not accept Charges. \n";
}
else if($text == "1*2"){
    // TO DO : fetch fee
    $response = "CON  A R10 fee will be charged to your account: \n";
    $response .= "1. Authorise payment. \n";
    $response .= "2. Do not accept Charges. \n";
}
else if($text == "1*3"){
    // TO DO : fetch fee
    $response = "CON  A R10 fee will be charged to your account: \n";
    $response .= "1. Authorise payment. \n";
    $response .= "2. Do not accept Charges. \n";
}
else if($text == "1*4"){
    // TO DO : fetch fee
    $response = "CON  A R10 fee will be charged to your account: \n";
    $response .= "1. Authorise payment. \n";
    $response .= "2. Do not accept Charges. \n";
}
//__________________________________________________________________________________________________________________________________________________________________________
// Fourth menu screen:
//**********************Yes**************************************** */
else if($text == "1*1*1"){
    // TO DO : Notify driver
    $response = "END  Payment completed. Thank you for using the service. \n";
}
else if($text == "1*2*1"){
    // TO DO : Notify driver
    $response = "END  Payment completed. Thank you for using the service. \n";
}
else if($text == "1*3*1"){
    // TO DO : Notify driver
    $response = "END  Payment completed. Thank you for using the service. \n";
}
else if($text == "1*4*1"){
    // TO DO : Notify driver
    $response = "END  Payment completed. Thank you for using the service. \n";
}
//*****************No********************************************* */
else if($text == "1*1*2"){
    // TO DO : Notify driver
    $response = "END  Please disembark taxi or restart the service. \n";
}
else if($text == "1*2*2"){
    // TO DO : Notify driver
    $response = "END  Please disembark taxi or restart the service. \n";
}
else if($text == "1*3*2"){
    // TO DO : Notify driver
    $response = "END  Please disembark taxi or restart the service. \n";
}
else if($text == "1*4*2"){
    // TO DO : Notify driver
    $response = "END  Please disembark taxi or restart the service. \n";
}
//echo response
header('Content-type: text/plain');
echo $response;
?>