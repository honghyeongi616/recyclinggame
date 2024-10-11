package com.example.recycling_game.repository;
import com.example.recycling_game.model.Score;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface ScoreRepository extends JpaRepository<Score, Long> {
    List<Score> findByUsername(String username);
}
