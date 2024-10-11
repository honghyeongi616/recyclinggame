package com.example.recycling_game.service;
import com.example.recycling_game.model.Score;
import com.example.recycling_game.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScoreServiceImpl implements ScoreService{
    @Autowired
    private ScoreRepository scoreRepository;

    @Override
    public void addScore(Score score) {
        scoreRepository.save(score);
    }

    @Override
    public List<Score> getScoresByUser(String username) {
        return scoreRepository.findByUsername(username);
    }
}
