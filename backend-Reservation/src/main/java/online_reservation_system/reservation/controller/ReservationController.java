package online_reservation_system.reservation.controller;

import lombok.RequiredArgsConstructor;
import online_reservation_system.reservation.domain.Reservation;
import online_reservation_system.reservation.exceptionHandling.MyGlobalExceptionHandler;
import online_reservation_system.reservation.exceptionHandling.ReservationNotFoundException;
import online_reservation_system.reservation.exceptionHandling.UserNotFoundException;
import online_reservation_system.reservation.repository.UserRepository;
import online_reservation_system.reservation.service.ReservationService;
import online_reservation_system.reservation.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reservation")

@CrossOrigin(origins = "http://localhost:3000/make-reservation")
public class ReservationController {

    private final ReservationService reservationService;
    private final UserService userService;
    @PostMapping("/make-reservation")
    public ResponseEntity<Reservation> makeReservation(@RequestBody Reservation reservation) throws MyGlobalExceptionHandler {
         Reservation newReservation = reservationService.makeReservation(reservation);
        return ResponseEntity.ok(newReservation);
    }

    @GetMapping("/getAllReservations")
    public ResponseEntity<List<Reservation>> getAllReservations(){
        return new ResponseEntity<>(reservationService.findAllReservations(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public Reservation getByReservationId(@PathVariable Long id){
        return reservationService.findReservationById(id);
    }

    @DeleteMapping("/{userId}/{reservationId}")
    public ResponseEntity<?> cancelReservation(@PathVariable Long userId, @PathVariable Long reservationId) {
        try {
            reservationService.cancelReservation(userId, reservationId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (UserNotFoundException | ReservationNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }


}
