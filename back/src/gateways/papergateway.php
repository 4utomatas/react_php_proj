<?php

namespace Gateways;

/**
 * Executes and returns query results that are associated with paper table. 
 * @param Database Database file
 * @author Matas Pugzlys w19006600
 */
class PaperGateway extends Gateway
{
    // Decluters functions and defines base structure
    private $baseSqlQuery =
    "SELECT p.paper_id, p.title, p.abstract, p.doi, p.video, p.preview, aw.awards
     FROM paper AS p
     LEFT JOIN (
        SELECT aw.paper_id, group_concat(aw.award_type_id, ',') as 'awards'
        FROM award AS aw 
        GROUP BY aw.paper_id
     ) AS aw ON aw.paper_id = p.paper_id";

    public function __construct()
    {
        $this->setDatabase(DATABASE);
    }

    public function findAll()
    {
        // WITH clause doesn't work on the server :(
        // So I was forced to use LEFT JOIN (...)
        $sql = "SELECT p.paper_id, p.title, p.abstract, p.doi, p.video, p.preview, aw.awards,
                    CASE 
                        WHEN a.middle_name IS NULL 
                        THEN group_concat(a.first_name || ' ' || a.middle_name || ' ' || a.last_name, ', ')
                        ELSE group_concat(a.first_name || ' ' || a.last_name, ', ')
                    END AS 'authors'
                FROM paper AS p 
                INNER JOIN paper_author AS pa ON pa.paper_id = p.paper_id
                INNER JOIN author AS a ON a.author_id = pa.author_id
                LEFT JOIN (
                    SELECT aw.paper_id, group_concat(aw.award_type_id, ',') as 'awards'
                    FROM award AS aw 
                    GROUP BY aw.paper_id
                ) AS aw ON aw.paper_id = p.paper_id
                GROUP BY p.paper_id
                ORDER BY p.title ASC";

        $result = $this->getDatabase()->executeSQL($sql);
        $this->setResult($result);
    }

    public function findOne($id)
    {
        $sql = $this->baseSqlQuery . " WHERE p.paper_id = :id";
        $params = ["id" => $id];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }

    public function findRandom()
    {
        $sql = "SELECT p.paper_id, p.title, p.abstract, p.doi, p.video, p.preview, aw.awards,
                    CASE 
                        WHEN a.middle_name IS NULL 
                        THEN group_concat(a.first_name || ' ' || a.middle_name || ' ' || a.last_name, ', ')
                        ELSE group_concat(a.first_name || ' ' || a.last_name, ', ')
                    END AS 'authors'
                FROM paper AS p 
                INNER JOIN paper_author AS pa ON pa.paper_id = p.paper_id
                INNER JOIN author AS a ON a.author_id = pa.author_id
                LEFT JOIN (
                    SELECT aw.paper_id, group_concat(aw.award_type_id, ',') as 'awards'
                    FROM award AS aw 
                    GROUP BY aw.paper_id
                ) AS aw ON aw.paper_id = p.paper_id
                GROUP BY p.paper_id
                ORDER BY random() limit 1";
        $result = $this->getDatabase()->executeSQL($sql);
        $this->setResult($result);
    }

    /**
     * Finds paper(s) that are associated with author.author_id in paper_author table
     * @param int $authorId author.author_id
     */
    public function findByAuthor($authorId)
    {
        $sql = "SELECT p.paper_id, p.title, p.abstract, p.doi, p.video, p.preview, aw.awards,
                    CASE 
                        WHEN a.middle_name IS NULL 
                        THEN group_concat(a.first_name || ' ' || a.middle_name || ' ' || a.last_name, ', ')
                        ELSE group_concat(a.first_name || ' ' || a.last_name, ', ')
                    END AS 'authors'
                FROM paper AS p 
                INNER JOIN paper_author AS pa ON pa.paper_id = p.paper_id
                INNER JOIN author AS a ON a.author_id = pa.author_id
                LEFT JOIN (
                    SELECT aw.paper_id, group_concat(aw.award_type_id, ',') as 'awards'
                    FROM award AS aw 
                    GROUP BY aw.paper_id
                ) AS aw ON aw.paper_id = p.paper_id
                WHERE pa.author_id = :id
                GROUP BY p.paper_id
                ORDER BY p.title ASC";
        $params = ["id" => $authorId];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }

    /**
     * Finds paper(s) that are associated with awards
     * @param int $awardTypeId award.award_type_id
     */
    public function findWithAward($awardTypeId)
    {
        $sql = "SELECT p.paper_id, p.title, p.abstract, p.doi, p.video, p.preview, aw.awards
                FROM paper AS p
                INNER JOIN (
                    SELECT aw.paper_id, group_concat(aw.award_type_id, ',') as 'awards'
                    FROM award AS aw 
                    GROUP BY aw.paper_id
                ) AS aw ON aw.paper_id = p.paper_id";
        if ($awardTypeId != "all") {
            $sql = "SELECT p.paper_id, p.title, p.abstract, p.doi, p.video, p.preview, aw.awards
                    FROM paper AS p
                    INNER JOIN (
                        SELECT aw.paper_id, group_concat(aw.award_type_id, ',') as 'awards'
                        FROM award AS aw 
                        WHERE aw.award_type_id = :typeId
                        GROUP BY aw.paper_id
                    ) AS aw ON aw.paper_id = p.paper_id";
            $params = ["typeId" => $awardTypeId];
            $result = $this->getDatabase()->executeSQL($sql, $params);
        } else {
            $result = $this->getDatabase()->executeSQL($sql);
        }
        $this->setResult($result);
    }

    /**
     * Finds paper(s) that are associated award.award_type_id
     * @param int $awardTypeId award.award_type_id
     */
    public function findWithReadingList($userId)
    {
        $sql = "SELECT p.paper_id, p.title, p.abstract, p.doi, p.video, p.preview, up.paper_id IS NOT NULL AS 'is_in_readinglist', aw.awards,
                    CASE 
                        WHEN a.middle_name IS NULL 
                        THEN group_concat(a.first_name || ' ' || a.middle_name || ' ' || a.last_name, ', ')
                        ELSE group_concat(a.first_name || ' ' || a.last_name, ', ')
                    END AS 'authors'
                FROM paper AS p 
                INNER JOIN paper_author AS pa ON pa.paper_id = p.paper_id
                INNER JOIN author AS a ON a.author_id = pa.author_id
                LEFT JOIN (
                    SELECT aw.paper_id, group_concat(aw.award_type_id, ',') as 'awards'
                    FROM award AS aw 
                    GROUP BY aw.paper_id
                ) AS aw ON aw.paper_id = p.paper_id
                LEFT JOIN user_paper AS up ON up.paper_id = p.paper_id AND up.user_id = :userId
                GROUP BY p.paper_id
                ORDER BY p.title ASC";

        $params = ["userId" => $userId];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }

    public function findByAuthorWithReadingList($userId, $authorId)
    {
        $sql = "SELECT p.paper_id, p.title, p.abstract, p.doi, p.video, p.preview, up.paper_id IS NOT NULL AS 'is_in_readinglist', aw.awards,
                    CASE 
                        WHEN a.middle_name IS NULL 
                        THEN group_concat(a.first_name || ' ' || a.middle_name || ' ' || a.last_name, ', ')
                        ELSE group_concat(a.first_name || ' ' || a.last_name, ', ')
                    END AS 'authors'
                FROM paper AS p 
                INNER JOIN paper_author AS pa ON pa.paper_id = p.paper_id
                INNER JOIN author AS a ON a.author_id = pa.author_id
                LEFT JOIN user_paper AS up ON up.paper_id = p.paper_id AND up.user_id = :userId
                LEFT JOIN (
                    SELECT aw.paper_id, group_concat(aw.award_type_id, ',') as 'awards'
                    FROM award AS aw 
                    GROUP BY aw.paper_id
                ) AS aw ON aw.paper_id = p.paper_id
                WHERE a.author_id = :authorId
                GROUP BY p.paper_id
                ORDER BY p.title ASC";

        $params = ["userId" => $userId, "authorId" => $authorId];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }
}
