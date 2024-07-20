package online_reservation_system.reservation.service;

import lombok.RequiredArgsConstructor;
import online_reservation_system.reservation.domain.Reservation;
import online_reservation_system.reservation.domain.User;
import online_reservation_system.reservation.exceptionHandling.ReservationNotFoundException;
import online_reservation_system.reservation.exceptionHandling.UserNotFoundException;
import online_reservation_system.reservation.repository.ReservationRepository;
import online_reservation_system.reservation.repository.UserRepository;
import org.hibernate.boot.model.process.internal.UserTypeResolution;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;

    public Reservation makeReservation(Reservation reservation) {
        Optional<User> user = userRepository.findById(reservation.getUserId());
        if (user.isPresent()) {
            return reservationRepository.save(reservation);
        } else {
            throw new UserNotFoundException("Sorry, user ID not found.");
        }
    }

    public void cancelReservation(Long userId, Long reservationId) {
        if (!userRepository.existsById(userId)) {
            throw new UserNotFoundException("Sorry, user ID not found.");
        }
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ReservationNotFoundException("Reservation not found for the given user ID."));
        if (!(reservation.getUserId() == (userId))) {
            throw new ReservationNotFoundException("Reservation not found for the given user ID.");
        }
        reservationRepository.deleteById(reservationId);
    }

    public List<Reservation> findAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation findReservationById(Long id) {
        return reservationRepository.findById(id).get();
    }
}
