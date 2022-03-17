<?php

namespace Gateways;

/**
 * Executes and returns query results that are associated with user_paper table. 
 * @param Database Database file
 * @author Matas Pugzlys w19006600
 */
class ReadingListGateway extends Gateway
{
    public function __construct()
    {
        $this->setDatabase(DATABASE);
    }

    /**
     * Returns paper list where the paper is associated with the user_paper.user_id
     * @param int @userId user_paper.user_id
     */
    public function findByUser($userId)
    {
        $sql = "SELECT p.paper_id, p.title, p.abstract, p.doi, p.video, p.preview, up.paper_id IS NOT NULL AS 'is_in_readinglist', aw.awards,
                    CASE 
                        WHEN a.middle_name IS NULL 
                        THEN group_concat(a.first_name || ' ' || a.middle_name || ' ' || a.last_name, ', ')
                        ELSE group_concat(a.first_name || ' ' || a.last_name, ', ')
                    END AS 'authors'
                FROM user_paper AS up
                INNER JOIN paper AS p ON p.paper_id = up.paper_id
                INNER JOIN paper_author AS pa ON pa.paper_id = p.paper_id
                INNER JOIN author AS a ON a.author_id = pa.author_id
                LEFT JOIN (
                    SELECT aw.paper_id, group_concat(aw.award_type_id, ',') as 'awards'
                    FROM award AS aw 
                    GROUP BY aw.paper_id
                ) AS aw ON aw.paper_id = p.paper_id
                WHERE up.user_id = :id
                GROUP BY up.paper_id
                ORDER BY p.title";
        $params = ["id" => $userId];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }

    /**
     * Adds paper to user reading list in user_paper table
     * @param int @userId user_paper.user_id
     * @param int @paperId user_paper.paper_id
     */
    public function add($userId, $paperId)
    {
        $sql = "INSERT INTO user_paper (user_id, paper_id) VALUES (:user_id, :paper_id)";
        $params = [":user_id" => $userId, ":paper_id" => $paperId];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }

    /**
     * Removes paper from user reading list in user_paper table
     * @param int @userId user_paper.user_id
     * @param int @paperId user_paper.paper_id
     */
    public function remove($userId, $paperId)
    {
        $sql = "DELETE FROM user_paper WHERE (user_id = :user_id) AND (paper_id = :paper_id)";
        $params = [":user_id" => $userId, ":paper_id" => $paperId];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }
}
