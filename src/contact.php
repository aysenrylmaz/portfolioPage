<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $data = json_decode(file_get_contents("php://input"));

  $name = $data->name;
  $email = $data->email;
  $message = $data->message;

  // Mail function can be used here to send email or store in the database
  $to = "youremail@example.com";
  $subject = "Contact Form Submission from $name";
  $body = "Name: $name\nEmail: $email\nMessage: $message";
  $headers = "From: $email";

  if (mail($to, $subject, $body, $headers)) {
    echo json_encode(["message" => "Message sent successfully"]);
  } else {
    echo json_encode(["message" => "Failed to send message"]);
  }
} else {
  echo json_encode(["message" => "Invalid request method"]);
}
?>